import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import IconButton from 'material-ui/IconButton';
import { ListItemIcon } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { resizeImg } from '../ultis';

const styles: React.CSSProperties = theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 35%, ${
      theme.palette.primary.main
    } 95%)`,
    padding: '.1vw',
    margin: '0 1vw 1vw',
    color: theme.palette.primary.contrastText,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    marginLeft: 35,
  },
  divLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
    // width: '40vw',
  },
  divRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
    width: '40vw',
  },
  button: {
    filter: 'invert(1)',
    '&:hover': { filter: 'invert(.5)' },
  },
  copyRight: {
    display: 'block',
  },
  text2: {
    color: 'white',
  },
});

const Footer = ({ classes }) => (
  <Paper className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.divLeft}>
        <img
          style={{ margin: 5 }}
          src={resizeImg(
            'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-footlogo_5ac348523a214.jpg',
            303
          )}
          alt=""
        />
        <Typography variant="title" align="center">
          <Button
            color="primary"
            variant="raised"
            href="http://tohshyu.co.jp/"
            target="_blank"
          >
            Tohsyu Trading Co.,Ltd
          </Button>
        </Typography>
      </div>
      <div className={classes.divRight}>
        <Typography color="inherit">
          <ButtonBase
            href="https://www.peaks8-online.shop/privacy"
            target="_blank"
          >
            Privacy Policy
          </ButtonBase>
        </Typography>
        <Typography color="inherit" align="left">
          <ButtonBase href="https://www.peaks8-online.shop/law" target="_blank">
            Act on Specified Commercial Transactions
          </ButtonBase>
        </Typography>
        <div>
          <IconButton
            target="_blank"
            href="https://www.facebook.com/PeaksEight"
          >
            <ListItemIcon>
              <img
                className={classes.button}
                src="/assets/icons/facebook-f.svg"
                alt=""
              />
            </ListItemIcon>
          </IconButton>
          <IconButton target="_blank" href="https://twitter.com/peaks_eight">
            <ListItemIcon>
              <img
                className={classes.button}
                src="/assets/icons/twitter.svg"
                alt=""
              />
            </ListItemIcon>
          </IconButton>
          <IconButton target="_blank" href="http://instagram.com/peaks_eight">
            <ListItemIcon>
              <img
                className={classes.button}
                src="/assets/icons/instagram.svg"
                alt=""
              />
            </ListItemIcon>
          </IconButton>
        </div>
      </div>
    </div>
    <div className={classes.copyRight}>
      <Typography align="center" color="inherit">
        Copyright © Peaks Eight Co.,Ltd. All Rights Reserved.
      </Typography>
    </div>
  </Paper>
);
Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect()(withStyles(styles)(Footer));
