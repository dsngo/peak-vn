import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney, resizeImg } from '../ultis';

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    display: 'flex',
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
};
const ProductCard = ({ classes, productItem, currencyRate }) => (
  <Grid item md={3} xl={4}>
    <ButtonBase
      className={classes.button}
      focusRipple
      component={Link}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      to={`/items/${productItem.productId}`}
    >
      <img src={resizeImg(productItem.productImg[0].url, 200)} alt="" />
      <GridListTileBar
        actionIcon={<StarBorderIcon className={classes.icon} />}
        actionPosition="left"
        title={formatMoney(productItem.productPrice * currencyRate.sellRate)}
        subtitle={`${productItem.productCategory}`}
      />
    </ButtonBase>
  </Grid>
);

const mapStateToProps = state => ({
  currencyRate: state.currencyRates.find(e => e.currencyCode === 'JPY'),
});

export default connect(mapStateToProps)(withStyles(styles)(ProductCard));
