import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React, { Component, Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import { questions } from '../ultis/surveyQuestions';
import { saveSurveyToDatabase } from '../redux/actionCreators';

const styles = theme => ({
  root: {
    width: '95%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  contentContainer: {
    paddingLeft: theme.spacing.unit * 3,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function renderContent(content, control, methodC, methodT) {
  switch (content.type) {
    case 'radio':
      return (
        <FormControlLabel
          control={
            <Radio
              checked={control.checked.includes(content.meta)}
              onChange={methodC(content.type, content.meta, content.step)}
              value={content.meta}
            />
          }
          label={content.meta}
        />
      );
    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={control.checked.includes(content.meta)}
              onChange={methodC(content.type, content.meta)}
              value={content.meta}
            />
          }
          label={content.meta}
        />
      );
    case 'checkbox-text':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={control.checked.includes(content.meta)}
              onChange={methodC(content.type, content.meta)}
              value={content.meta}
            />
          }
          label={
            <TextField
              value={control.text}
              onChange={methodT}
              margin="normal"
              placeholder={content.meta}
            />
          }
        />
      );
    case 'radio-text':
      return (
        <FormControlLabel
          control={
            <Radio
              checked={control.checked.includes(content.meta)}
              onChange={methodC(content.type, content.meta)}
              value={content.meta}
            />
          }
          label={
            <TextField
              value={control.text}
              onChange={methodT}
              margin="normal"
              placeholder={content.meta}
            />
          }
        />
      );
    default:
      return (
        <div>
          <TextField
            value={control.text}
            onChange={methodT}
            multiline
            rowsMax={5}
            margin="normal"
            placeholder={content.meta}
            fullWidth
          />
        </div>
      );
  }
}

class Question extends Component {
  state = {
    checked: [],
    text: '',
    step: 1,
  };
  static getDerivedStateFromProps(props, state) {
    if (state.checked.length === 0 && state.text === '' && props.state) {
      return props.state;
    }
    return null;
  }
  handleChecking = (identifier, val, step = 1) => () => {
    this.setState(prevState => ({
      ...prevState,
      step,
      checked:
        identifier.substr(0, 5) === 'radio'
          ? [val]
          : prevState.checked.includes(val)
            ? prevState.checked
                .filter(e => e !== 'Không thích thương hiệu nào cả')
                .filter(e => e !== val)
            : [
                ...prevState.checked.filter(
                  e => e !== 'Không thích thương hiệu nào cả'
                ),
                val,
              ],
    }));
  };
  handleText = event => this.setState({ text: event.target.value });
  handleNext = (id, name) => () => {
    if (id === 15) {
      this.props.handleFinish({ name, ...this.state, id })();
    }
    this.props.handleNext({
      name,
      ...this.state,
      step: name.substr(-1, 1) === 'A' ? 2 : this.state.step,
      id,
    })();
  };
  render() {
    const { classes, question, handleBack } = this.props;
    return (
      <Fragment>
        {question.content.map(e => (
          <FormGroup key={e.meta} className={classes.contentContainer}>
            {renderContent(e, this.state, this.handleChecking, this.handleText)}
          </FormGroup>
        ))}
        <div>
          <Button
            disabled={question.id === 1}
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleNext(
              question.id,
              question.name,
              question.name.substr(-1, 1) === 'A' ? 2 : 1
            )}
            className={classes.button}
          >
            {question.id === 15 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Fragment>
    );
  }
}

class Survey extends React.Component {
  props: {
    saveSurveyToDatabase: Function,
  };
  state = {
    activeStep: 0,
    answer: [],
  };

  handleNext = answer => () => {
    this.setState(pS => ({
      answer: [...pS.answer.filter(e => !(e.id === answer.id)), answer],
      activeStep: pS.activeStep + answer.step,
    }));
  };

  handleBack = () => {
    this.setState(pS => ({ ...pS, activeStep: pS.activeStep - 1 }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleFinish = answer => async () => {
    await this.handleNext(answer)();
    this.props.saveSurveyToDatabase(this.state.answer);
  };
  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {questions.map(question => (
            <Step key={question.id}>
              <StepLabel>{question.name}</StepLabel>
              <StepContent>
                <Typography>{question.question}</Typography>
                <div className={classes.actionsContainer}>
                  <Question
                    state={this.state.answer.find(
                      e => e.name === question.name
                    )}
                    question={question}
                    classes={classes}
                    handleBack={this.handleBack}
                    handleNext={this.handleNext}
                    handleFinish={this.handleFinish}
                  />
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {this.state.answer.find(e => e.id === 15) && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Cảm ơn bạn đã hoàn thành khảo sát</Typography>
          </Paper>
        )}
      </div>
    );
  }
}

export default connect(null, { saveSurveyToDatabase })(
  withStyles(styles)(Survey)
);
