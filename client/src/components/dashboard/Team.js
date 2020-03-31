import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Layout from './Layout';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

export default function Team() {
    const [users, setUsers] = React.useState([]);

    // API call
    const fetchUsers = async () => {
        const apiCall = await fetch('http://localhost:4000/api/team');
        const data = await apiCall.json();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    return(
        <Layout>
            <Paper>
                <List>
                    {
                        users.map(user => (
                            <ListItem key={user._id}>
                                <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.email}  />
                            </ListItem>
                        ))
                    }
                </List>
            </Paper>
        </Layout>
    )
}