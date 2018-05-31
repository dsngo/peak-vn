import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { resizeImg } from '../ultis';

const styles: React.CSSProperties = theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 35%, ${
      theme.palette.primary.main
    } 95%)`,
    padding: '.1vw .1vw 5px',
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
    width: 15,
    filter: 'invert(1)',
    '&:hover': { filter: 'invert(.5)' },
  },
  copyRight: {
    display: 'block',
  },
  text2: {
    color: 'white',
  },
  img: {
    width: "100%",
    margin: 5,
  }
});

const Footer = ({ classes }) => (
  <Paper className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.divLeft}>
        <img
          className={classes.img}
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
            <img
              className={classes.button}
              src="/assets/icons/facebook-f.svg"
              alt=""
            />
          </IconButton>
          <IconButton target="_blank" href="https://twitter.com/peaks_eight">
            <img
              className={classes.button}
              src="/assets/icons/twitter.svg"
              alt=""
            />
          </IconButton>
          <IconButton target="_blank" href="http://instagram.com/peaks_eight">
            <img
              className={classes.button}
              src="/assets/icons/instagram.svg"
              alt=""
            />
          </IconButton>
        </div>
      </div>
    </div>
    <div className={classes.copyRight}>
      <Typography variant="caption" align="center" color="inherit">
        Copyright © Peaks Eight Co.,Ltd. All Rights Reserved.
      </Typography>
    </div>
  </Paper>
);
Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Footer);
