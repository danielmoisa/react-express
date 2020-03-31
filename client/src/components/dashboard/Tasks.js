import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TimeField from 'react-simple-timefield';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { stopIt } from '../../actions/timerActions';

import Layout from './Layout';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  timePicker: {
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 700,  
    backgroundColor: '#edf7fa',
    borderRadius: 4,
    border: '1px solid rgba(0, 0, 0, 0.23)',
  },
  formControl: {
    width: '100%',
    backgroundColor: '#edf7fa',
    borderRadius: 4,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    marginTop: '1.3rem',
  },
});

function Tasks(props) {
  const classes = useStyles();

  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState({ description: '', duration: '00:00:00', project: '' });
  const [msg, setMsg] = React.useState('');
  
  // API call
  const fetchTasks = async () => {
    const apiCall = await fetch('http://localhost:4000/api');
    const tasks = await apiCall.json();
    setTasks(tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, [msg])

  const handleAddTask = e => {
    e.preventDefault();
    fetch('http://localhost:4000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTask)
    }).then(res => res.json())
      .then(data => setMsg(data))

      setNewTask(({ description: '', duration: '00:00:00', project: '' }));
  }


  const handleDelete = (e, _id) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/delete/' + _id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => setMsg(res))
  }

  const handleStop = () => {
    clearInterval(props.timerId);
    props.stopTimer();
  };

  // Display date in human
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Timer
  const { timerTime } = props;
  let seconds = ("0" + (Math.floor(timerTime / 100) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timerTime / 6000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(timerTime / 360000)).slice(-2);

  const currentTime = hours + ':' + minutes + ':' + seconds;

  useEffect(() => {
    setNewTask({ duration: currentTime });
  },[currentTime])
  
  return (
    <Layout>
    <div className={classes.root}>

    {msg.message && <Alert severity={msg.message === 'New task added successfully' ? 'success' : 'error'}>{ msg.message }</Alert>}

      <Paper className={classes.paper}>

      {
          props.timerOn === true ? (
          <Box style={{padding: '2rem'}}>
              <Typography style={{paddingTop: '1rem'}} variant="body2">New task in progress: <b>{hours} : {minutes} : {seconds}</b>
              <CircularProgress size={20} style={{margin: '0 1rem -6px 1rem'}} /> 
              <Button variant="outlined" color="secondary" size="small" onClick={handleStop}>Save as</Button></Typography>
          </Box>
          ) :  (
          <Box style={{ padding: '1rem'}}>
            <form onSubmit={handleAddTask}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={7}>
                      <TextField
                      autoFocus
                      style={{ backgroundColor: '#edf7fa' }}
                      value={newTask.description} 
                      onChange={e => setNewTask({...newTask, description: e.target.value })}
                      placeholder="What are you working on?"
                      fullWidth
                      margin="normal"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      />
                    </Grid>
  
                    <Grid item sm={12} md={2}>
                      <TimeField  
                        onFocus={handleStop}    
                        style={{ width: '100%', height: '56px', marginTop: '1rem', color: 'rgba(0, 0, 0, 0.70)'}} 
                        className={ classes.timePicker}           
                        value={newTask.duration} 
                        onChange={e => setNewTask({...newTask, duration: e.target.value })}
                        showSeconds />
                    </Grid>
  
                    <Grid item sm={12} md={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-autowidth-label" style={{ paddingLeft: 15, paddingTop: 10, marginTop: '-1rem'}}>Select project</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={newTask.project} 
                          onChange={e => setNewTask({...newTask, project: e.target.value })}
                          autoWidth>
                            <MenuItem value='Project One'>Project One</MenuItem>
                            <MenuItem value='Mighty Coorp'>Mighty Coorp</MenuItem>
                            <MenuItem value='Side Project'>Side Project</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
  
                    <Grid item sm={12} md={1}>
                      <Button type="submit" style={{marginTop: '1.4rem'}} variant="contained" color="primary" size="large">
                        ADD
                      </Button>
                    </Grid>
                  </Grid>
                </form>
            </Box>)
      }

        
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow> 
                <TableCell style={{ fontWeight: 700}} align="center">Description</TableCell>
                <TableCell style={{ fontWeight: 700}} align="center">Created</TableCell>
                <TableCell style={{ fontWeight: 700}} align="center">Duration(h)</TableCell>
                <TableCell style={{ fontWeight: 700}} align="center">Project</TableCell>
                <TableCell style={{ fontWeight: 700}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(task => {
                let {_id} = task;
                return(
                  <TableRow key={task._id}>
                  <TableCell component="th" scope="row" align="center">
                    {task.description}
                  </TableCell>
                  <TableCell align="center">{new Date(task.createdAt).toLocaleDateString('en-GB', options)}</TableCell>
                  <TableCell align="center" style={{fontSize: 16, letterSpacing: 2}}>{task.duration}</TableCell>
                  <TableCell align="center">{task.project}</TableCell>
                  <TableCell align="center" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Link to={'/dashboard/task/' + _id}>
                      <Button  type="submit"><EditIcon /></Button>
                    </Link>
                    <form onSubmit={(e) => handleDelete(e, _id)}>
                      <Button type="submit"><DeleteIcon /></Button>
                    </form>
                    </TableCell>
                </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
    </Layout>
  );
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
    stopTimer: () => {
      dispatch(stopIt());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);