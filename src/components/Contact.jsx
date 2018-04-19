import React from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
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
    if (Object.values(this.state).include('')) {
      this.props.updateSiteStatus('Xin vui lòng điền đầy đủ thông tin!');
    } else {
      this.props.saveOrderToDatabase();
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          label="Họ và tên"
          error={!this.state.name}
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          helperText={!this.state.name && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Địa chỉ email"
          error={!this.state.email}
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          helperText={!this.state.email && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Số điện thoại"
          error={!this.state.phone}
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          helperText={!this.state.phone && 'Thông tin bắt buộc'}
          margin="normal"
        />
        <TextField
          label="Chủ đề"
          error={!this.state.topic}
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
          rowsMax="10"
          value={this.state.question}
          onChange={this.handleChange('question')}
          className={classes.textField}
          helperText={!this.state.question && 'Thông tin bắt buộc'}
          margin="normal"
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(Contact);
