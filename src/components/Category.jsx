import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import { productList } from '../data';
import ProductCard from './ProductCard';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  relatedItems: {
    margin: '1vw',
    padding: '1vw',
    display: 'flex',
    flexDirection: 'row',
  },
};

const Category = ({ classes, match }) => (
  <Paper className={classes.root}>
    <Paper className={classes.relatedItems}>
      {productList
        .filter(e => e.productCode.substr(4, 3) === match.params.categoryId)
        .map(e => <ProductCard key={e.productId} {...{ productItem: e }} />)}
    </Paper>
  </Paper>
);
export default withStyles(styles)(Category);
