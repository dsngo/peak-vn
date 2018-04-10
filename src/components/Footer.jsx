import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles: React.CSSProperties = {
  footer: {
    background: 'linear-gradient(45deg, #37474f 45%, #62727b 95%)',
    padding: '.1vw',
    margin: '0 1vw 1vw',
    color: 'white',
    height: '30vh'
  },
};

class Footer extends React.Component {
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
        <Paper className={classes.footer}>
          <Toolbar>
            <Typography variant="title" className={classes.flex}>
              <Link to="/">
                <img
                  style={{ width: '30%' }}
                  src="https://base-ec2.akamaized.net/images/user/logo/033815c0249a9cdcd34eaf53bed282b5.gif"
                  alt=""
                />
              </Link>
            </Typography>
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
        </Paper>
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
Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect()(withStyles(styles)(Footer));
