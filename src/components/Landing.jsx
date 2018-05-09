import FiberNewIcon from '@material-ui/icons/FiberNew';
import ButtonBase from 'material-ui/ButtonBase';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Fade from 'material-ui/transitions/Fade';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { resizeImg } from '../ultis';
import ProductCard from './ProductCard';
import { fetchProductList, fetchCurrencyRate } from '../redux/actionCreators';

const carouselImg = [
  {
    id: 14422,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider1_5ac33f367c2ef.jpg',
  },
  {
    id: 25125,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider3_5ac4a8aa184d7.jpg',
  },
  {
    id: 2123,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider5_5ac4a76cd0be8.jpg',
  },
  {
    id: 12354,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider2_5ac33f36c6f3c.jpg',
  },
  {
    id: 5125,
    url:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-slider4_5ac4aa0c080ff.jpg',
  },
];
const pickUpData = [
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_1_5ac6ea2d6a80d.jpg',
    imgDescription: 'Facebook',
    title: 'facebook',
    description: 'We opened official Facebook page of "Peaks Eight"!',
    metalink: 'https://www.facebook.com/PeaksEight',
  },
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_2_5ac6ea2db16b6.jpg',
    imgDescription: 'Twitter',
    title: 'twitter',
    description: 'We opened official Twitter page of "Peaks Eight"!',
    metalink: 'https://twitter.com/peaks_eight',
  },
  {
    imgLink:
      'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-pick_img_3_5ac6ea2e08c29.jpg',
    imgDescription: 'Instagram',
    title: 'instagram',
    description: 'We opened official Instagram page of "Peaks Eight"!',
    metalink: 'https://www.instagram.com/peaks_eight',
  },
];
const newsInfo = [
  {
    priority: 41231,
    url: 'https://goo.gl/1cgBmE',
    headline:
      'AMAZON 1afffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    date: '04/21/2018',
  },
  {
    priority: 552,
    url: 'https://goo.gl/1cgBmE',
    headline: 'AMAZON 2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    date: '04/21/2018',
  },
  {
    priority: 34123,
    url: 'https://goo.gl/1cgBmE',
    headline: 'AMAZON 3ggggggggggggggggggggggggggggggggggggggggggggggg',
    date: '04/21/2018',
  },
  {
    priority: 341223,
    url: '',
    headline: 'AMAZON 3ggggggggggggggggggggggggggggggggggggggggggggggg',
    date: '04/21/2018',
  },
];
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
  },
  image: {
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
  media: {
    height: 175,
  },
  pickup: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
  information: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
  products: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
  divider: {
    marginTop: 5,
  },
  puImg: {
    height: 75,
  },
  card: {
    maxWidth: 200,
    maxHeight: 250,
  },
  puCard: {
    display: 'inline',
  },
  gridContainer: {
    marginBottom: 5,
  },
  listInfo: {
    padding: '0 16px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
};
class Landing extends Component {
  props: {
    classes: Object,
    productList: Array,
  };
  state = {
    loading: true,
  };
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.productList.length > 0) {
      return { loading: false };
    }
    return null;
  }
  componentDidMount() {
    this.props.fetchProductList();
    this.props.fetchCurrencyRate();
  }
  render() {
    const { loading } = this.state;
    const { classes, productList } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Carousel
          showArrows
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
        >
          {carouselImg.map(e => (
            <div key={e.id}>
              <img
                className={classes.imgCrop}
                key={e.id}
                src={resizeImg(e.url, 1200)}
                alt=""
              />
            </div>
          ))}
        </Carousel>
        <Typography
          className={classes.pickup}
          variant="display2"
          component="h2"
        >
          PICK UP
        </Typography>
        <Grid
          container
          className={classes.gridContainer}
          justify="center"
          spacing={24}
        >
          {pickUpData.map(e => (
            <Grid key={e.imgDescription} item xl={4}>
              <ButtonBase
                focusRipple
                className={classes.image}
                component={Link}
                to={e.metalink}
                target="_blank"
                style={{ outline: 'none', textDecoration: 'none' }}
              >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.puImg}
                    image={resizeImg(e.imgLink, 200)}
                    title={e.imgDescription}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {e.title.toUpperCase()}
                    </Typography>
                    <Typography component="p">{e.description}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
        <Divider className={classes.divider} />
        <Typography
          className={classes.information}
          variant="display2"
          component="h2"
        >
          INFORMATION
        </Typography>
        <List className={classes.listInfo} component="nav">
          {newsInfo.map(e => (
            <ListItem
              button={Boolean(e.url)}
              key={e.priority}
              component={Link}
              to={e.url}
              target={e.url && '_blank'}
              style={{ outline: 'none', textDecoration: 'none' }}
            >
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary={e.headline} secondary={e.date} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider} />
        <Typography
          className={classes.products}
          variant="display2"
          component="h2"
        >
          PRODUCTS
        </Typography>
        <div className={classes.loading}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
            size={100}
          >
            <CircularProgress />
          </Fade>
        </div>
        <Grid
          container
          className={classes.gridContainer}
          justify="center"
          spacing={8}
        >
          {productList &&
            productList.map(e => (
              <ProductCard key={e.productId} productItem={e} />
            ))}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.productList,
});
const mapDispatchToProps = {
  fetchProductList,
  fetchCurrencyRate,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Landing)
);
