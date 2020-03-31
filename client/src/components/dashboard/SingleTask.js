import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


import Layout from './Layout';

function SingleTask({match}) {
    const [task, setTask] = React.useState([]);
    const [newTask, setNewTask] = React.useState({ description: '', duration: '00:00:00', project: '' });
    const [msg, setMsg] = React.useState('');
    
    // API call
    const fetchTasks = async () => {
      const apiCall = await fetch('http://localhost:4000/api/' + match.params.id);
      const task = await apiCall.json();
      setTask(task);
      console.log(task)
    }
  
    useEffect(() => {
      fetchTasks();
    }, [])

    const handleTaskUpdate = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/' + match.params.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(res => setMsg(res))
      }

    const useStyles = makeStyles(theme => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      const classes = useStyles();

    return (
        <Layout>
            {msg.message && <Alert severity="success">{ msg.message }</Alert>}
            <Paper>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit task
                </Typography>
                <form onSubmit={handleTaskUpdate} className={classes.form} noValidate>
                <TextField
                      name="description"
                      value={newTask.description} 
                      onChange={e => setNewTask({...newTask, description: e.target.value })}
                      label="Description"
                      placeholder={task.description}
                      fullWidth
                      margin="normal"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      />
                <TextField
                    name="duration"
                    placeholder={task.duration}
                    value={newTask.duration} 
                    onChange={e => setNewTask({...newTask, duration: e.target.value })}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Duration"
                    type="text"
                   
                />

                <TextField
                    name="project"
                    placeholder={task.project}
                    value={newTask.project} 
                    onChange={e => setNewTask({...newTask, project: e.target.value })}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Project"
                    type="text"
                />          

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Update task
                </Button>
                </form>
            </div>
            </Container>
            </Paper>
        </Layout>
    )
}


export default SingleTask;
