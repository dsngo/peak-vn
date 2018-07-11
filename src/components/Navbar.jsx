import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { formatMoney, resizeImg } from '../ultis';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import {
  updateCartItem,
  removeCartItem,
  addSiteStatus,
  toggleSnackbar,
} from '../redux/actionCreators';

const navBar = [
  {
    id: 1,
    title: 'home',
    url: '/',
  },
  {
    id: 2,
    title: 'about',
    url: '/about',
  },
  {
    id: 3,
    title: 'category',
    url: '/category',
  },
  {
    id: 4,
    title: 'contact',
    url: '/contact',
  },
];

const styles: React.CSSProperties = theme => ({
  iconSizeMenu: {
    fontSize: 36,
  },
  iconSize: {
    fontSize: 24,
    width: 15,
  },
  titleText: {
    fontWeight: 'bold',
    color: 'inherit',
  },
  appBar: {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 35%, ${
      theme.palette.primary.light
    } 95%)`,
    borderRadius: 2,
    boxShadow: '0 3px 5px 2px rgba(26, 15, 53, 0.302)',
    margin: '0.2vw 1.1vw',
    width: 'auto',
  },
  cartInfoText: {
    float: 'right',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
});

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
    // isMenuDrawerOpen: false,
    isCategoryDrawerOpen: false,
    isDialogOpen: false,
    width: 0,
    cartItemBadge: 0,
  };

  static getDerivedStateFromProps(nextP) {
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
            {cartItems.length > 0 && (
              <Button
                variant="raised"
                color="primary"
                component={Link}
                to="/checkout"
                onClick={this.toggleModal('isDialogOpen', false)}
              >
                Thanh toán
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  renderCategoryDrawer = () => {
    const { classes } = this.props;
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
          {navBar.map(e => (
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
              <img
                className={classes.iconSize}
                src="/assets/icons/facebook-f.svg"
                alt=""
              />
            </IconButton>
            <IconButton target="_blank" href="https://twitter.com/peaks_eight">
              <img
                className={classes.iconSize}
                src="/assets/icons/twitter.svg"
                alt=""
              />
            </IconButton>
            <IconButton target="_blank" href="http://instagram.com/peaks_eight">
              <img
                className={classes.iconSize}
                src="/assets/icons/instagram.svg"
                alt=""
              />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    );
  };
  renderSnackBar = () => {
    const { isOpen, text, key } = this.props.siteStatus;
    return (
      <Snackbar
        key={key}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => this.props.toggleSnackbar(false)}
        message={<span id="message-id">{text}</span>}
      />
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Link to="/">
              <img
                style={{ width: '65%' }}
                src={resizeImg(
                  'https://base-ec2if.akamaized.net/images/user/logo/033815c0249a9cdcd34eaf53bed282b5.gif',
                  375
                )}
                alt=""
              />
            </Link>
            <div>
              {this.state.width > 995 &&
                navBar.map(e => (
                  <Button
                    key={e.id}
                    size="large"
                    color="inherit"
                    component={e.title !== 'category' ? Link : Button}
                    to={e.url}
                    onClick={c =>
                      e.title === 'category'
                        ? this.toggleModal('isCategoryDrawerOpen', true)()
                        : c
                    }
                  >
                    <Typography variant="title" className={classes.titleText}>
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
              {this.state.width <= 995 && (
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleModal('isCategoryDrawerOpen', true)}
                >
                  <MenuIcon style={styles.iconSizeMenu} />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {/* {this.renderMenuDrawer()} */}
        {this.renderDialog()}
        {this.renderCategoryDrawer()}
        {this.renderSnackBar()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.userCartItems,
  currencyRate: state.currencyRates.find(e => e.currencyCode === 'JPY'),
  productList: state.productList,
  siteStatus: state.siteStatus,
});
const mapDispathToProps = {
  updateCartItem,
  removeCartItem,
  addSiteStatus,
  toggleSnackbar,
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withStyles(styles)(Navbar));
