import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { addSiteStatus, saveContactToDatabase } from '../redux/actionCreators';

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
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmitForm = () => {
    const contact = {
      contactName: this.state.name,
      contactPhone: this.state.phone,
      contactEmail: this.state.email,
      contactTopic: this.state.topic,
      contactQuestion: this.state.question,
      status: 'Unfinised',
    }
    if (Object.values(contact).includes('')) {
      this.props.addSiteStatus('Xin vui lòng điền đầy đủ thông tin!');
    } else {
      this.props.saveContactToDatabase();
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

const mapStateToProps = state => ({
  siteStatus: state.siteStatus,
});
const mapDispatchToProps = {
  addSiteStatus,
  saveContactToDatabase,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Contact)
);
