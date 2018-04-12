import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import Card, { CardContent, CardHeader, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { capFirstChar } from '../ultis';

const styles: { [key: string]: React.CSSProperties } = {
  avatar: {
    backgroundColor: red[500],
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
  productCard: {
    width: 200,
    height: 325,
  },
};
const ProductCard = ({ classes, productItem }) => (
  <Grid item xl={3}>
    <ButtonBase
      focusRipple
      className={classes.image}
      component={Link}
      to={`/items/${productItem.productCode}`}
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
          title={productItem.productName}
          subheader={productItem.listingDate}
        />
        <CardMedia
          className={classes.media}
          image={productItem.productImg}
          title={productItem.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="button" component="p">
            {productItem.productPrice}
          </Typography>
          <Typography variant="caption" component="p">{`${
            productItem.productCode
          } - ${capFirstChar(productItem.productGender)}'s ${
            productItem.productDescription.prefix
          } - ${capFirstChar(productItem.productVariable[0])}`}</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  </Grid>
);

export default withStyles(styles)(ProductCard);
