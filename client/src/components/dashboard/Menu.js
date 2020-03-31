import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import TimerIcon from '@material-ui/icons/Timer';

import { NavLink } from 'react-router-dom';

export const mainListItems = (
  <div>
    <NavLink activeClassName="active" to="/dashboard/index">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>

    <NavLink activeClassName="active" to="/dashboard/tasks">
    <ListItem button>
      <ListItemIcon>
        <FormatListNumberedRtlIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItem>
    </NavLink>

    <NavLink activeClassName="active"  to="/dashboard/timer">
    <ListItem button>
      <ListItemIcon>
        <TimerIcon />
      </ListItemIcon>
      <ListItemText primary="Timer" />
    </ListItem>
    </NavLink>
    
    <NavLink activeClassName="active"  to="/dashboard/team">
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Team" />
    </ListItem>
    </NavLink>
  </div>
);
