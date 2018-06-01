import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { formatMoney, resizeImg } from '../ultis';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  carousel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
  imgCard: {
    maxWidth: '100%',
  },
  img: {
    width: 60,
    // display: 'inline',
  },
  bigImg: {
    width: '40%',
    // display: 'block',
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
  margin: {
    marginTop: 5,
  },
};

class SurveyCard extends React.Component {
  state = {
    dialogOpen: false,
    img: '',
  };
  toggleModal = key => () => {
    console.log('modal');
    this.setState(pS => ({ [key]: !pS[key] }));
  };
  handleChangeImg = event => this.setState({ img: event.target.src });
  renderDialog = () => {
    const { classes, currencyRate, productItem } = this.props;
    const { dialogOpen, img } = this.state;
    const thumbnails = productItem.productImg.map(e => e.url);
    const bigImg = thumbnails.includes(img)
      ? img
      : productItem.productImg[0].url;
    return (
      <Dialog
        maxWidth="md"
        open={dialogOpen}
        keepMounted
        onClose={this.toggleModal('dialogOpen')}
      >
        <DialogTitle>THÔNG TIN SẢN PHẨM</DialogTitle>
        <DialogContent>
          <div className={classes.carousel}>
            <img className={classes.bigImg} src={bigImg} alt="" />
            <ButtonBase onClick={this.handleChangeImg}>
              <img
                className={classes.img}
                src={resizeImg(productItem.productImg, 900)}
                alt=""
              />
            </ButtonBase>
            <div>
              <Typography variant="body2">Hình ảnh khác</Typography>
              {thumbnails.map(e => (
                <ButtonBase
                  className={classes.button}
                  key={e}
                  onClick={this.handleChangeImg}
                >
                  <img className={classes.img} src={e} alt="" />
                </ButtonBase>
              ))}
              <Divider className={classes.margin} />
              {productItem.productSize.map(e => {
                const spec = Object.keys(e).slice(1);
                return (
                  <React.Fragment key={e.name}>
                    <Typography
                      className={classes.extra}
                      variant="body2"
                    >{`Kích thước: ${e.name.toUpperCase()} - Đơn vị cm.`}</Typography>
                    <Typography>
                      - Số đo: {spec.map(s => `[${s}: ${e[s]}] `)}
                    </Typography>
                  </React.Fragment>
                );
              })}
              <Divider className={classes.margin} />
              <Typography variant="body2">Tính năng</Typography>
              {productItem.productFeature.map(e => (
                <Typography key={e} className={classes.extra}>
                  - {e}
                </Typography>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  render() {
    const { classes, productItem, currencyRate } = this.props;
    return (
      <Fragment>
        <Grid item xs={6} md={3} xl={2} className={classes.root}>
          <ButtonBase
            className={classes.button}
            focusRipple
            onClick={this.toggleModal('dialogOpen')}
          >
            <img
              className={classes.imgCard}
              src={resizeImg(productItem.productImg[0].url, 200)}
              alt=""
            />
            <GridListTileBar
              actionIcon={<StarBorderIcon className={classes.icon} />}
              actionPosition="left"
              title={formatMoney(
                productItem.productPrice * currencyRate.sellRate
              )}
              subtitle={`${productItem.productCategory}`}
            />
          </ButtonBase>
        </Grid>
        {this.renderDialog()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currencyRate: state.currencyRates.find(e => e.currencyCode === 'JPY'),
});

export default connect(mapStateToProps)(withStyles(styles)(SurveyCard));
