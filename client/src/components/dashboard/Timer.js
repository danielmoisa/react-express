import React from 'react';
import { Container , Button, Typography } from '@material-ui/core';  
import { connect } from 'react-redux';
import { startTimer, reset, stopIt, tick } from '../../actions/timerActions';

import Layout from './Layout';

class Timer extends React.Component {
  handleStop = () => {
    clearInterval(this.props.timerId);
    this.props.stopTimer();
  };
  
  render() {
    const { timerTime } = this.props;
    let seconds = ("0" + (Math.floor(timerTime / 100) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 6000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 360000)).slice(-2);
    return (
      <Layout>
        <Container  maxWidth="sm" style={{padding: '2rem', textAlign: 'center', background: 'rgba(0, 0, 0, 0.05)', border: '2px solid rgba(0, 0, 0, 0.1)', borderRadius: 5 }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>{hours} : {minutes} : {seconds}</Typography>

        {this.props.timerOn === false && this.props.timerTime === 0 && (
          <Button variant="contained" color="primary" size="large" onClick={this.props.startTimer}>Start</Button>
        )}
        {this.props.timerOn === true && (
          <Button variant="contained" color="primary" size="large" onClick={this.handleStop}>Stop</Button>
        )}
        {this.props.timerOn === false && this.props.timerTime > 0 && (
          <Button variant="contained" color="primary" size="large" onClick={this.props.startTimer} style={{marginRight: 10}}>Resume</Button>
        )}
        {this.props.timerOn === false && this.props.timerTime > 0 && (
          <Button variant="contained" color="primary" size="large" onClick={this.props.reset}>Reset</Button>
        )}
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    timerOn: state.timer.timerOn,
    timerStart: state.timer.timerStart,
    timerTime: state.timer.timerTime,
    timerId: state.timer.timerId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startTimer: () => {
      const timerId = setInterval(() => dispatch(tick()), 10);
      dispatch(startTimer(timerId));
    },
    stopTimer: () => {
      dispatch(stopIt());
    },
    reset: () => dispatch(reset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
