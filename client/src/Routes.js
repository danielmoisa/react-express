import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Tasks from './components/dashboard/Tasks';
import Timer from './components/dashboard/Timer';
import Dashboard from './components/dashboard/Dashboard';
import SingleTask from './components/dashboard/SingleTask';
import Team from './components/dashboard/Team';

import { Link } from 'react-router-dom' 
import withAuth from './components/withAuth'

export default function Routes() {
  return(
    <BrowserRouter>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
        </ul> */}
        <Switch>
          {/* <Route exact path="/" component={Login} /> */}
          <Route exact path="/" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          
          {/*Dashboard index with stats*/}
          <Route path="/dashboard/index" exact component={withAuth(Dashboard)} />
          {/*Tasks and add new task*/}
          <Route path="/dashboard/tasks" exact component={withAuth(Tasks)} />
          {/*Timer*/}
          <Route path="/dashboard/timer" exact component={withAuth(Timer)} />
          {/*Single task*/}
          <Route path="/dashboard/task/:id" component={withAuth(SingleTask)} />

          <Route path="/dashboard/team" exact component={Team} />

          {/*  <Route path="/" exact component={Home} />
           <Route path="/secret" component={Secret} /> */}
        </Switch>
    </BrowserRouter>
  )
}