import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '5vw .1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const CompletePayment = ({ classes }) => (
  <Paper className={classes.root}><Typography variant="title">
    Cảm ơn bạn đã thanh toán trực tuyến.
  </Typography></Paper>
);

export default withStyles(styles)(CompletePayment);
