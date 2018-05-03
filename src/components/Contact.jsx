import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textField: {
    width: '50vw',
  },
  menu: {
    width: 200,
  },
});

class Contact extends React.Component {
  state = {
    name: '',
    phone: '',
    email: '',
    topic: '',
    question: '',
    finished: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmitForm = () => {
    if (Object.values(this.state).includes('')) {
      // console.log('not ok');
      this.props.updateSiteStatus('Xin vui lòng điền đầy đủ thông tin!');
    } else {
      // console.log('ok');
      this.props.saveOrderToDatabase();
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          label="Họ và tên"
          required={!this.state.name}
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          helperText={!this.state.name && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          type="email"
          required={!this.state.email}
          label="Địa chỉ email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          helperText={!this.state.email && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Số điện thoại"
          required={!this.state.phone}
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          helperText={!this.state.phone && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Chủ đề"
          required={!this.state.topic}
          className={classes.textField}
          value={this.state.topic}
          onChange={this.handleChange('topic')}
          helperText={!this.state.topic && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Câu hỏi"
          multiline
          rows={7}
          required={!this.state.question}
          rowsMax="10"
          value={this.state.question}
          onChange={this.handleChange('question')}
          className={classes.textField}
          helperText={!this.state.question && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <Button
          variant="raised"
          color="primary"
          to="/checkout"
          onClick={this.handleSubmitForm}
        >
          SUBMIT
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(Contact);
