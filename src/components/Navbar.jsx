import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import data, { productList } from '../data';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { formatMoney } from '../ultis';
import { updateCartItem, removeCartItem } from '../redux/actionCreators';

const styles: React.CSSProperties = {
  list: {
    width: '15vw',
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    float: 'right',
    marginLeft: 10,
    marginRight: 10,
  },
  iconSizeMenu: {
    fontSize: 36,
  },
  iconSize: {
    fontSize: 24,
  },
  titleLink: {
    outline: 'none !important',
    textDecoration: 'none !important',
    '&:hover': {
      color: 'white',
    },
    '&:visited': {
      color: 'white',
    },
    '&:active': {
      color: 'white',
    },
  },
  titleText: {
    // color: 'white !important',
    fontWeight: 'bold',
    color: 'white',
    // fontSize: 16,
    // margin: '0 5px',
    // padding: '0 5px',
  },
  appBar: {
    background: 'linear-gradient(45deg, #37474f 35%, #62727b 95%)',
    borderRadius: 2,
    boxShadow: '0 3px 5px 2px #1a0f354d',
    margin: '0.2vw 1.1vw',
    width: 'auto',
  },
};

function cText(e) {
  // const test = e.substr(4, 3);
  switch (e) {
    case 'WTM':
      return 'Jacket Men';
    case 'TSM':
      return 'T-Shirt Men';
    case 'PTM':
      return 'Pants Men';
    case 'LSL':
      return 'Jacket/Hoodie Women';
    case 'PTL':
      return 'Pants Women';
    case 'ACL':
      return 'Accessories Women';
    default:
      return '';
  }
}

function cLink(e) {
  return (
    <ListItem key={e} button component={Link} to={`/category/${e}`}>
      <ListItemText primary={cText(e)} />
    </ListItem>
  );
}

class Navbar extends React.Component {
  props: {
    classes: Object,
    cartItems: Array,
    currencyRate: Object,
  };
  state = {
    isMenuDrawerOpen: false,
    isCategoryDrawerOpen: false,
    isDialogOpen: false,
    width: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  toggleModal = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleUpdateCartItem = (action, i, q) => () => {
    switch (action) {
      case 'decrease':
        this.props.updateCartItem(i, 'itemQuantity', q - 1);
        return;
      case 'increase':
        this.props.updateCartItem(i, 'itemQuantity', q + 1);
        return;
      case 'remove':
        this.props.removeCartItem(i);
        break;
      default:
    }
  };
  renderDialog = () => {
    const { cartItems } = this.props;
    return (
      <Dialog
        open={this.state.isDialogOpen}
        keepMounted
        onClose={this.toggleModal('isDialogOpen', false)}
        style={{ float: 'right' }}
      >
        <DialogTitle> User Cart Items </DialogTitle>
        <DialogContent>
          {cartItems.map(e => (
            <div key={e.itemId}>
              <img style={{ width: 60 }} src={e.itemImg} alt="" />
              {`${e.itemId} - ${e.itemCode} - qty:${
                e.itemQuantity
              } - price: ${formatMoney(
                e.itemQuantity * this.props.currencyRate.sellRate * e.itemPrice
              )}`}
              <button
                onClick={this.handleUpdateCartItem(
                  'decrease',
                  e.itemId,
                  e.itemQuantity
                )}
              >
                -
              </button>
              <button
                onClick={this.handleUpdateCartItem(
                  'increase',
                  e.itemId,
                  e.itemQuantity
                )}
              >
                +
              </button>
              <button onClick={this.handleUpdateCartItem('remove', e.itemId)}>
                X
              </button>
            </div>
          ))}
          <div style={{ float: 'right' }}>
            {cartItems.length > 0
              ? `Total Price: ${formatMoney(
                  cartItems.reduce(
                    (a, c) =>
                      a +
                      c.itemPrice *
                        this.props.currencyRate.sellRate *
                        c.itemQuantity,
                    0
                  )
                )}`
              : 'You have not choose an item'}
            {cartItems.length > 0 && (
              <Button
                variant="raised"
                color="primary"
                component={Link}
                to="/checkout"
                className={this.props.classes.titleLink}
                onClick={this.toggleModal('isDialogOpen', false)}
              >
                Checkout
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  renderMenuDrawer = () => (
    <Drawer
      anchor="right"
      transitionDuration={300}
      open={this.state.isMenuDrawerOpen}
      onClose={this.toggleModal('isMenuDrawerOpen', false)}
    >
      <List onClick={this.toggleModal('isMenuDrawerOpen', false)}>
        {mailFolderListItems}
      </List>
      <Divider />
      <List>{otherMailFolderListItems}</List>
    </Drawer>
  );
  renderCategoryDrawer = () => {
    const category = productList.reduce(
      (a, c) =>
        a.includes(c.productCode.substr(4, 3))
          ? a
          : [...a, c.productCode.substr(4, 3)],
      []
    );
    return (
      <Drawer
        anchor="right"
        open={this.state.isCategoryDrawerOpen}
        onClose={this.toggleModal('isCategoryDrawerOpen', false)}
      >
        <List onClick={this.toggleModal('isCategoryDrawerOpen', false)}>
          {category.map(e => cLink(e))}
        </List>
      </Drawer>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Link to="/" className={classes.titleLink}>
              <img
                style={{ width: '65%' }}
                src="https://base-ec2.akamaized.net/images/user/logo/033815c0249a9cdcd34eaf53bed282b5.gif"
                alt=""
              />
            </Link>
            {this.state.width > 800 &&
              data.navBar.map(e => (
                <Button
                  key={e.id}
                  size="large"
                  className={classes.titleLink}
                  component={e.title !== 'category' ? Link : Button}
                  to={e.url}
                  onClick={c =>
                    e.title === 'category'
                      ? this.toggleModal('isCategoryDrawerOpen', true)()
                      : c
                  }
                >
                  <Typography variant="headline" className={classes.titleText}>
                    {e.title.toUpperCase()}
                  </Typography>
                </Button>
              ))}
            <IconButton
              className={classes.cartButton}
              color="inherit"
              aria-label="Cart"
              onClick={this.toggleModal('isDialogOpen', true)}
            >
              <ShoppingCart style={styles.iconSize} />
            </IconButton>
            {this.state.width <= 800 && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleModal('isMenuDrawerOpen', true)}
              >
                <MenuIcon style={styles.iconSizeMenu} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {this.renderMenuDrawer()}
        {this.renderDialog()}
        {this.renderCategoryDrawer()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.userCartItems,
  currencyRate: state.currencyRates[0],
});
const mapDispathToProps = dispatch => ({
  updateCartItem: (i, v, k) => dispatch(updateCartItem(i, v, k)),
  removeCartItem: i => dispatch(removeCartItem(i)),
});

export default connect(mapStateToProps, mapDispathToProps)(
  withStyles(styles)(Navbar)
);
