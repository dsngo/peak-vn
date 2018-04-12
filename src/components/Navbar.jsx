import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import data from '../data';
import AppBar from 'material-ui/AppBar';

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

class Navbar extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" component={Link} to="/">
              <img
                style={{ width: '40%' }}
                src="https://base-ec2.akamaized.net/images/user/logo/033815c0249a9cdcd34eaf53bed282b5.gif"
                alt=""
              />
            </Typography>
            {data.navBar.map(e => (
              <Button
                key={e.id}
                size="large"
                className={classes.titleLink}
                component={Link}
                to={e.url}
              >
                <Typography
                  variant="headline"
                  // color="inherit"
                  className={classes.titleText}
                >
                  {e.title.toUpperCase()}
                </Typography>
              </Button>
            ))}
            <IconButton
              className={classes.cartButton}
              color="inherit"
              aria-label="Cart"
              onClick={this.toggleDrawer('right', true)}
            >
              <ShoppingCart style={styles.iconSize} />
            </IconButton>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer('right', true)}
            >
              <MenuIcon style={styles.iconSizeMenu} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            <List>{mailFolderListItems}</List>
            <Divider />
            <List>{otherMailFolderListItems}</List>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}
Navbar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect()(withStyles(styles)(Navbar));
