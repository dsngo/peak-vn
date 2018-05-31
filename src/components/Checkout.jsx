import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import {
  clearCartItem,
  removeCartItem,
  updateCartItem,
  saveOrderToDatabase,
} from '../redux/actionCreators';
import { formatDate, formatMoney } from '../ultis';

const styles = theme => ({
  root: {
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
  },
  centerDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  return [
    'Đơn Hàng',
    'Địa Chỉ Nhận Hàng',
    'Thông Tin Thanh Toán',
    'Hoàn Thành Đơn Hàng',
  ];
}

class Checkout extends React.Component {
  props: {
    classes: Object,
    userCartItems: Array,
    updateCartItem: Function,
    removeCartItem: Function,
  };

  state = {
    errorText: '',
    activeStep: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    extra: '',
    paymentType: '',
  };
  steps = getSteps();
  vendorEmail = 'daniel.dungngo@gmail.com';
  date = Date.now();
  handleNext = () => {
    const { activeStep, name, email, phone, address, paymentType } = this.state;
    if (
      activeStep === 1 &&
      name.length === 0 &&
      email.length === 0 &&
      phone.length === 0 &&
      address.length === 0
    )
      return this.setState({ errorText: 'Xin vui lòng điền đầy đủ thông tin' });
    if (activeStep === 2 && paymentType.length === 0)
      return this.setState({
        errorText: 'Xin vui lòng chọn phương thức thanh toán',
      });
    if (activeStep === this.steps.length - 1) this.handleCreateOrder();
    return this.setState({
      activeStep: activeStep + 1,
      errorText: '',
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
  handleDone = () => {};
  handleUpdateState = k => e => {
    this.setState({ [k]: e.target.value });
  };
  handleUpdateCartItem = (action, i, q, s) => () => {
    switch (action) {
      case 'decrease':
        this.props.updateCartItem(i, 'itemQuantity', q - 1, s);
        return;
      case 'increase':
        this.props.updateCartItem(i, 'itemQuantity', q + 1, s);
        return;
      case 'remove':
        this.props.removeCartItem(i, s);
        break;
      default:
    }
  };
  handleUpdatePayment = paymentType => () => {
    this.setState({ paymentType });
  };
  handleCreateOrder = () => {
    const order = {
      orderUser: '5addaefedd8a213de0d0eaf7',
      orderDate: formatDate(this.date),
      orderId: this.date.toString(36),
      orderName: this.state.name,
      orderAddress: this.state.address,
      orderPhone: this.state.phone,
      orderTotalPrice: this.props.userCartItems.reduce(
        (a, c) =>
          a + c.itemPrice * this.props.currencyRate.sellRate * c.itemQuantity,
        0
      ),
      orderPaymentType: this.state.paymentType,
      orderItems: this.props.userCartItems,
      orderStatus: 'Pending',
    };
    this.props.clearCartItem();
    this.props.saveOrderToDatabase(order);
  };
  handleGetStepContent = () => {
    switch (this.state.activeStep) {
      case 0:
        return this.renderOrder();
      case 1:
        return this.renderAddress();
      case 2:
        return this.renderPayment();
      case 3:
        return this.renderFinish();
      default:
        return 'Uknown stepIndex';
    }
  };
  renderOrder = () => (
    <React.Fragment>
      {this.props.userCartItems.map(e => (
        <div key={e.itemId}>
          <img style={{ width: 60 }} src={e.itemImg} alt="" />
          {`${e.itemId} - ${e.itemCode} - qty:${
            e.itemQuantity
          } - price: ${formatMoney(
            e.itemQuantity * this.props.currencyRate.sellRate * e.itemPrice
          )}`}
          <button
            onClick={this.handleUpdateCartItem(
              'decrease',
              e.itemId,
              e.itemQuantity,
              e.itemSize
            )}
          >
            -
          </button>
          <button
            onClick={this.handleUpdateCartItem(
              'increase',
              e.itemId,
              e.itemQuantity,
              e.itemSize
            )}
          >
            +
          </button>
          <button
            onClick={this.handleUpdateCartItem(
              'remove',
              e.itemId,
              null,
              e.itemSize
            )}
          >
            X
          </button>
        </div>
      ))}
      {`Total Price: ${formatMoney(
        this.props.userCartItems.reduce(
          (a, c) =>
            a + c.itemPrice * this.props.currencyRate.sellRate * c.itemQuantity,
          0
        )
      )}`}
    </React.Fragment>
  );
  renderAddress = () => {
    const { classes } = this.props;
    return (
      <div className={classes.centerDiv}>
        {this.state.errorText && (
          <Typography color="error">{this.state.errorText}</Typography>
        )}
        <TextField
          label="Họ và tên"
          required={!this.state.name}
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleUpdateState('name')}
          helperText={!this.state.name && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          type="email"
          required={!this.state.email}
          label="Địa chỉ email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleUpdateState('email')}
          helperText={!this.state.email && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Số điện thoại"
          required={!this.state.phone}
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleUpdateState('phone')}
          helperText={!this.state.phone && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Địa chỉ nhận hàng"
          required={!this.state.address}
          className={classes.textField}
          value={this.state.address}
          onChange={this.handleUpdateState('address')}
          helperText={!this.state.address && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Thông tin bổ xung"
          multiline
          rows={4}
          rowsMax="10"
          value={this.state.extra}
          onChange={this.handleUpdateState('extra')}
          margin="normal"
        />
      </div>
    );
  };
  renderPayment = () => (
    <div className={this.props.classes.centerDiv}>
      {this.state.errorText && (
        <Typography color="error">{this.state.errorText}</Typography>
      )}
      <FormControl>
        <FormLabel>Vui lòng chọn phương thức thanh toán.</FormLabel>
        <RadioGroup
          value={this.state.paymentType}
          onChange={this.handleUpdateState('paymentType')}
        >
          <FormControlLabel
            value="nganluong"
            control={<Radio color="primary" />}
            label="Thanh toán trực tuyến qua NganLuong.com"
          />
          <FormControlLabel
            value="codviettel"
            control={<Radio color="primary" />}
            label="Thanh toán bằng tiền mặt với COD Viettel"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
  renderFinish = () => (
    <div>
      <Typography variant="title">Thông tin kiểm tra</Typography>
      <Typography>Họ và tên: {this.state.name}</Typography>
      <Typography>Số điện thoại: {this.state.phone}</Typography>
      <Typography>Email: {this.state.email}</Typography>
      <Typography>Địa chỉ: {this.state.address}</Typography>
      <Typography>Thông tin bổ xung: {this.state.extra}</Typography>
      {this.props.userCartItems.map(e => (
        <Typography key={e.itemId}>
          <img style={{ width: 60 }} src={e.itemImg} alt="" />
          {`${e.itemName} - Số lượng: ${
            e.itemQuantity
          } - Giá tiền: ${formatMoney(
            e.itemQuantity * this.props.currencyRate.sellRate * e.itemPrice
          )}`}
        </Typography>
      ))}
      <Typography variant="title">{`Tổng tiền đơn hàng: ${formatMoney(
        this.props.userCartItems.reduce(
          (a, c) =>
            a + c.itemPrice * this.props.currencyRate.sellRate * c.itemQuantity,
          0
        )
      )}`}</Typography>
      <Typography>Vui lòng ấn hoàn thành để tạo đơn hàng</Typography>
    </div>
  );
  render() {
    const { classes } = this.props;
    const { steps } = this;
    const { activeStep, paymentType } = this.state;
    return (
      <Paper className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div className={classes.centerDiv}>
              <Typography className={classes.instructions}>
                Đơn hàng của bạn đã được khởi tạo&#33;
              </Typography>
              <Typography className={classes.instructions}>
                Nếu bạn chọn phương thức thanh toán trực tuyến, vui lòng hoàn
                thành thông tin ở trang nganluong.com
              </Typography>
              <Button component={Link} to="/">
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <div>
              {this.handleGetStepContent()}
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
                  target={
                    paymentType === 'nganluong' &&
                    activeStep === steps.length - 1
                      ? '_blank'
                      : '_self'
                  }
                  href={
                    paymentType === 'nganluong' &&
                    activeStep === steps.length - 1
                      ? `https://www.nganluong.vn/button_payment.php?receiver=${
                          this.vendorEmail
                        }&product_name=${this.date.toString(
                          36
                        )}&price=${this.props.userCartItems.reduce(
                          (a, c) =>
                            a +
                            c.itemPrice *
                              this.props.currencyRate.sellRate *
                              c.itemQuantity,
                          0
                        )}&return_url=http://localhost:3000/complete&comments=${
                          this.state.extra
                        }`
                      : ''
                  }
                >
                  {activeStep === steps.length - 1 ? 'Hoàn Thành' : 'Tiếp Tục'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    );
  }
}
const mapStateToProps = state => ({
  userCartItems: state.userCartItems,
  currencyRate: state.currencyRates.find(e => e.currencyCode === 'JPY'),
  orderInfo: state.orderInfo,
});
const mapDispatchToProps = {
  updateCartItem,
  removeCartItem,
  clearCartItem,
  saveOrderToDatabase,
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Checkout)
);
