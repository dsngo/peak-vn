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
import { capFirstChar, formatDate, resizeImg } from '../ultis';

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
    height: 120,
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
      to={`/items/${productItem.productId}`}
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
          title={productItem.productCode}
          subheader={formatDate(productItem.listingDate)}
        />
        <CardMedia
          className={classes.media}
          image={resizeImg(productItem.productImg[0].url, 200)}
          title={productItem.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="button" component="p">
            {productItem.productPrice}
          </Typography>
          <Typography variant="caption" component="p">{`${capFirstChar(
            productItem.productGender
          )}'s ${productItem.productCategory} - ${capFirstChar(
            productItem.productColor
          )}`}</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  </Grid>
);

export default withStyles(styles)(ProductCard);
