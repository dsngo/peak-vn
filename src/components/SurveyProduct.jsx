import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import SurveyCard from './SurveyCard';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    // overflow: 'hidden',
    // padding: 5,
  },
  title: {
    padding: '20px 0',
  },
  loading: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 5,
  },
};

const SurveyProduct = ({ classes, womenProducts, menProducts }) => (
  <Fragment>
    {womenProducts.length === 0 ? (
      <div>
        <Fade
          in={womenProducts.length === 0}
          style={{
            transitionDelay: womenProducts.length === 0 ? '800ms' : '0ms',
          }}
          unmountOnExit
          size={100}
        >
          <CircularProgress />
        </Fade>
      </div>
    ) : (
      <div>
        <Typography variant="display2" align="center" className={classes.title}>
          THỜI TRANG NỮ
        </Typography>
        <Grid container justify="center">
          {womenProducts.map(e => (
            <SurveyCard key={e.productId} productItem={e} />
          ))}
        </Grid>
        <Typography variant="display2" align="center" className={classes.title}>
          THỜI TRANG NAM
        </Typography>
        <Grid container justify="center">
          {menProducts.map(e => (
            <SurveyCard key={e.productId} productItem={e} />
          ))}
        </Grid>
      </div>
    )}
  </Fragment>
);
const mapStateToProps = state => ({
  womenProducts: state.productList
    .filter(e => e.productGender === 'women')
    .sort((f, s) => f.productId - s.productId),
  menProducts: state.productList
    .filter(e => e.productGender === 'men')
    .sort((f, s) => f.productId - s.productId),
});

export default connect(mapStateToProps)(withStyles(styles)(SurveyProduct));
