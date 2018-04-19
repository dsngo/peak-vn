import React from 'react';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { connect} from 'react-redux'

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Đơn Hàng', 'Địa Chỉ Nhận Hàng', 'Thông Tin Thanh Toán'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Thông tin đơn hàng';
    case 1:
      return 'Thông tin địa chỉ nhận hàng';
    case 2:
      return 'Thông tin thanh toán';
    default:
      return 'Uknown stepIndex';
  }
}

class Checkout extends React.Component {
  props: {
    classes: Object,
    userCartItems: Array,
  };

  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleDone = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes, userCartItems } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const orderInfo = {
      

    }

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Đơn hàng của bạn đã được hoàn tất&#33;
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.handleReset}
              >
                Done
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userCartItems: state.userCartItems,
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));
