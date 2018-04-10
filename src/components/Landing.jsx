import FiberNewIcon from '@material-ui/icons/FiberNew';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
// import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import { withStyles } from 'material-ui/styles';
import React from 'react';
// import { clearSubmitStatus } from "./redux/actionCreators";
import connect from 'react-redux/es/connect/connect';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import data from '../data';
import { capFirstChar } from '../ultis';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
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
  card: {
    maxWidth: 200,
    maxHeight: 250,
  },
  productCard: {
    width: 200,
    height: 325,
  },
  media: {
    height: 175,
  },
  puCard: {
    display: 'inline',
  },
  image: {
    '&:hover': {
      zIndex: 1,
      opacity: 0.75,
      transition: 'all .5s ease',
    },
  },
  gridContainer: {
    marginBottom: 5,
  },
  listInfo: {
    padding: '0 16px',
  },
  avatar: {
    backgroundColor: red[500],
  },
};
const Landing = ({ classes }) => (
  <Paper className={classes.root} elevation={4}>
    <Carousel
      showArrows
      showStatus={false}
      showThumbs={false}
      infiniteLoop
      autoPlay
    >
      {data.carouselImg.map(e => (
        <div key={e.id} className={classes.carousel}>
          <img className={classes.imgCrop} key={e.id} src={e.url} alt="" />
        </div>
      ))}
    </Carousel>
    <Typography className={classes.pickup} variant="display2" component="h2">
      PICK UP
    </Typography>
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      spacing={24}
    >
      {data.pickUpData.map(e => (
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
                className={classes.media}
                image={e.imgLink}
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
      {data.newsInfo.map(e => (
        <ListItem
          button
          key={e.priority}
          component={Link}
          to={e.url}
          target="_blank"
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
    <Typography className={classes.products} variant="display2" component="h2">
      PRODUCTS
    </Typography>
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      spacing={8}
    >
      {data.productList.map(e => (
        <Grid key={e.productId} item xl={3}>
          <ButtonBase
            focusRipple
            className={classes.image}
            component={Link}
            to={`/items/${e.productId}`}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Card className={classes.productCard}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    New
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={e.productName}
                subheader={e.listingDate}
              />
              <CardMedia
                className={classes.media}
                image={e.productImg}
                title={e.productName}
              />
              <CardContent>
                <Typography gutterBottom variant="button" component="p">
                  {e.productPrice}
                </Typography>
                <Typography variant="caption" component="p">{`${
                  e.productCode
                } - ${capFirstChar(e.productGender)}'s ${
                  e.productDescription.prefix
                } - ${capFirstChar(e.productVariable[0])}`}</Typography>
              </CardContent>
            </Card>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default connect()(withStyles(styles)(Landing));
