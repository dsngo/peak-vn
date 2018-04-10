import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
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
  iconSize: {
    fontSize: 36,
  },
};

class TemporaryDrawer extends React.Component {
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
    // const sideList = (
    //   <div className={classes.list}>
    //     <List>{mailFolderListItems}</List>
    //     <Divider />
    //     <List>{otherMailFolderListItems}</List>
    //   </div>
    // );
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/">
                <img
                  style={{ width: '40%' }}
                  src="https://base-ec2.akamaized.net/images/user/logo/033815c0249a9cdcd34eaf53bed282b5.gif"
                  alt=""
                />
              </Link>
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
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
              <MenuIcon style={styles.iconSize} />
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
TemporaryDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect()(withStyles(styles)(TemporaryDrawer));
