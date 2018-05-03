import { Typography } from 'material-ui';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import { productList } from '../data';
import ProductCard from './ProductCard';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '15px .1vw .1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gridContainer: {
    margin: '15px 0'
  },
};

const cat = [
  { id: 'WTM', name: 'Jacket Men' },
  { id: 'TSM', name: 'T-Shirt Men' },
  { id: 'PTM', name: 'Pants Men' },
  { id: 'LSL', name: 'Jacket/Hoodie Women' },
  { id: 'PTL', name: 'Pants Women' },
  { id: 'ACL', name: 'Accessories Women' },
];

const AllProduct = ({ classes }) => (
  <Paper className={classes.root}>
    {cat.map(e1 => (
      <React.Fragment key={e1.id}>
        <Typography variant="title" align="center">
          {e1.name}
        </Typography>
        <Grid
          container
          className={classes.gridContainer}
          justify="center"
          spacing={8}
        >
          {productList
            .filter(e2 => e2.productCode.substr(4, 3) === e1.id)
            .map(e3 => (
              <ProductCard key={e3.productId} {...{ productItem: e3 }} />
            ))}
        </Grid>
      </React.Fragment>
    ))}
  </Paper>
);
export default withStyles(styles)(AllProduct);
