import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import { productList } from '../data';
import ProductCard from './ProductCard';
import Grid from 'material-ui/Grid';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
  },
  gridContainer: {
    margin: '15px 0'
  },
};

const Category = ({ classes, match }) => (
  <Paper className={classes.root}>
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      spacing={8}
    >
      {productList
        .filter(e => e.productCode.substr(4, 3) === match.params.categoryId)
        .map(e => <ProductCard key={e.productId} {...{ productItem: e }} />)}
    </Grid>
  </Paper>
);
export default withStyles(styles)(Category);
