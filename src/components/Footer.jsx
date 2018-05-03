import ButtonBase from 'material-ui/ButtonBase';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles: React.CSSProperties = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #37474f 45%, #62727b 95%)',
    padding: '.1vw',
    margin: '0 1vw 1vw',
    color: 'white',
    height: '30vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    marginLeft: 35,
  },
  div1: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    width: '40vw',
  },
  div2: {
    marginTop: 15,
    width: '40vw',
  },
  img: {
    width: 250,
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
  button: {
    filter: 'invert(1)',
    '&:hover': { filter: 'invert(.5)' },
  },
  copyRight: {
    paddingTop: 15,
    color: 'white',
  },
  text2: {
    color: 'white'
  }
};

const Footer = ({ classes }) => (
  <Paper className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.div1}>
        <ButtonBase href="http://tohshyu.co.jp/" target="_blank">
          <img
            className={classes.img}
            src="https://base-ec2.akamaized.net/images/user/template/peaks8-official-ec/image-footlogo_5ac348523a214.jpg"
            alt=""
          />
        </ButtonBase>
        <Typography variant="title" className={classes.text}>
          Tohsyu Trading Co.,Ltd
        </Typography>
      </div>
      <div className={classes.div2}>
        <Typography color="textSecondary">Privacy Policy</Typography>
        <Typography>Act on Specified Commercial Transactions</Typography>
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
    <Typography align="center" className={classes.copyRight}>
      Copyright © Peaks Eight Co.,Ltd. All Rights Reserved.
    </Typography>
  </Paper>
);
Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect()(withStyles(styles)(Footer));
