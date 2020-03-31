import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import {LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip} from 'recharts';


import Layout from './Layout';
import { connect } from 'react-redux';

function Dashboard(props) {
    const [tasks, setTasks] = React.useState([]);
    
    // API call
    const fetchTasks = async () => {
      const apiCall = await fetch('http://localhost:4000/api');
      const tasks = await apiCall.json();
      setTasks(tasks);
    }
  
    useEffect(() => {
      fetchTasks();
    }, [])
    
    const nrOfTaks = tasks.length;

    const data = [
        {name: 'jan', uv: 4000, pv: 2400, amt: 2400},
        {name: 'feb', uv: 3000, pv: 1398, amt: 2210},
        {name: 'mar', uv: 2000, pv: 9800, amt: 2290},
        {name: 'apr', uv: 2780, pv: 3908, amt: 2000},
        {name: 'may', uv: 1890, pv: 4800, amt: 2181},
        {name: 'jun', uv: 2390, pv: 3800, amt: 2500},
        {name: 'jul', uv: 3490, pv: 4300, amt: 2100},
  ];

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item sm={12} md={6}>
                <LineChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
                </Grid>
                    
                <Grid item sm={12} md={6}>
                    <Alert icon={false} severity="warning">
                        <Typography variant="body1">Latest tasks</Typography>
                    </Alert>
                    <Paper>
                    <TableContainer>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                        <TableRow> 
                            <TableCell style={{ fontWeight: 700}} align="left">Description</TableCell>
                            <TableCell style={{ fontWeight: 700}} align="left">Duration(h)</TableCell>
                            <TableCell style={{ fontWeight: 700}} align="left">Project</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.slice(0, 5).map(task => {
                            return(
                            <TableRow key={task._id}>
                            <TableCell component="th" scope="row" align="left">
                                {task.description}
                            </TableCell>
                            <TableCell align="left" style={{fontSize: 16, letterSpacing: 2}}>{task.duration}</TableCell>
                            <TableCell align="left">{task.project}</TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
                </Grid>
           
            </Grid>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        timerOn: state.timer.timerOn,
        timerStart: state.timer.timerStart,
        timerTime: state.timer.timerTime,
        timerId: state.timer.timerId
      };
    };

export default connect(mapStateToProps)(Dashboard);
