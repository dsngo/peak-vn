import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import Product from './SurveyProduct';
import Survey from './Survey';
import { fetchProductList, fetchCurrencyRate } from '../redux/actionCreators';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    padding: '.1vw .1vw 15px',
    margin: '0.2vw 1.1vw',
  },
  titleText: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
  divider: {
    marginTop: 5,
  },
  column: {
    flexBasis: '33.33%',
  },
  detail: {
    justifyContent: 'center'
  }
};
const createExpandable = (text, Elm) => (
  <ExpansionPanel defaultExpanded elevation={0}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="display1" component="h3">
        {text}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Elm />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
class SurveyPage extends Component {
  props: {
    classes: Object,
  };
  state = {
    productTab: true,
  };
  componentDidMount() {
    this.props.fetchProductList();
    this.props.fetchCurrencyRate();
  }
  handleToggleProduct = () => {
    this.setState(p => ({ productTab: !p.productTab }));
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <ExpansionPanel expanded={this.state.productTab} elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon onClick={this.handleToggleProduct} />}
          >
            <Typography variant="display1" component="h3">
              PRODUCTS
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Product />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button
              size="small"
              color="primary"
              onClick={this.handleToggleProduct}
            >
              Đóng
            </Button>
          </ExpansionPanelActions>;
        </ExpansionPanel>
        <Divider className={classes.divider} />
        {createExpandable('SURVEY', Survey)}
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  fetchProductList,
  fetchCurrencyRate,
};

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(SurveyPage)
);
