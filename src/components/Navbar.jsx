import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import data from '../data';
import { removeCartItem, updateCartItem } from '../redux/actionCreators';
import { formatMoney } from '../ultis';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

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
    fontWeight: 'bold',
    color: 'white',
  },
  appBar: {
    background: 'linear-gradient(45deg, #37474f 35%, #62727b 95%)',
    borderRadius: 2,
    boxShadow: '0 3px 5px 2px #1a0f354d',
    margin: '0.2vw 1.1vw',
    width: 'auto',
  },
  infoText: {
    float: 'right',
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
    cartItemBadge: 0,
  };

  static getDerivedStateFromProps(nextP, PrevS) {
    if (!nextP.cartItems) return null;
    return {
      cartItemBadge: nextP.cartItems.length,
    };
  }
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
            <div key={`${e.itemId}-${e.itemSize}`}>
              <img style={{ width: 60 }} src={e.itemImg} alt="" />
              <div className={this.props.classes.infoText}>
                <Typography>{`${e.itemGender}'s ${e.itemName}`}</Typography>
                <Typography>
                  {`Màu sắc/Size/Số lượng: ${e.itemColor}/${e.itemSize}/${
                    e.itemQuantity
                  } - Giá tiền: ${formatMoney(
                    e.itemQuantity *
                      this.props.currencyRate.sellRate *
                      e.itemPrice
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
                  <button
                    onClick={this.handleUpdateCartItem('remove', e.itemId)}
                  >
                    X
                  </button>
                </Typography>
              </div>
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
    const category = this.props.productList.reduce(
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
          {data.navBar.map(e => (
            <React.Fragment key={e.id}>
              <ListItem button component={Link} to={e.url}>
                <ListItemText primary={e.title.toUpperCase()} />
              </ListItem>
              {e.title === 'category' && (
                <List style={{ paddingLeft: 15 }}>
                  {category.map(e2 => cLink(e2))}
                </List>
              )}
            </React.Fragment>
          ))}
          <ListItem>
            <IconButton
              target="_blank"
              href="https://www.facebook.com/PeaksEight"
            >
              <ListItemIcon>
                <img src="/assets/icons/facebook-f.svg" alt="" />
              </ListItemIcon>
            </IconButton>
            <IconButton target="_blank" href="https://twitter.com/peaks_eight">
              <ListItemIcon>
                <img src="/assets/icons/twitter.svg" alt="" />
              </ListItemIcon>
            </IconButton>
            <IconButton target="_blank" href="http://instagram.com/peaks_eight">
              <ListItemIcon>
                <img src="/assets/icons/instagram.svg" alt="" />
              </ListItemIcon>
            </IconButton>
          </ListItem>
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
              <Badge badgeContent={this.state.cartItemBadge} color="error">
                <ShoppingCart style={styles.iconSize} />
              </Badge>
            </IconButton>
            {this.state.width <= 800 && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleModal('isCategoryDrawerOpen', true)}
              >
                <MenuIcon style={styles.iconSizeMenu} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {/* {this.renderMenuDrawer()} */}
        {this.renderDialog()}
        {this.renderCategoryDrawer()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.userCartItems,
  currencyRate: state.currencyRates[0],
  productList: state.productList,
});
const mapDispathToProps = dispatch => ({
  updateCartItem: (i, v, k) => dispatch(updateCartItem(i, v, k)),
  removeCartItem: i => dispatch(removeCartItem(i)),
});

export default connect(mapStateToProps, mapDispathToProps)(
  withStyles(styles)(Navbar)
);
