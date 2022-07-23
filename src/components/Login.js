import { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Login = (props) => {
    const [user, setUser] = useState('');

    const handleChange = (e) => {
        setUser(e.target.value);
    }

    const handleClick = () => {
        if (user) {
            props.dispatch(setAuthedUser(user));
            //*** Todo:- Navigate to Dashboard ***
        }
        else {
            alert('No user selected');
        }
    }

    console.log('In login : ', props);
    return (
        <div>
            <Typography variant="h3" align="center" color="textPrimary"> User Login </Typography>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '70vh' }}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <PersonIcon style={{ fontSize: 100 }} />
                </Box>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="select-user-label">Users</InputLabel>
                        <Select
                            labelId="select-user-label"
                            id="select-user"
                            value={user}
                            onChange={handleChange}
                            autoWidth
                            label="User"
                        >
                            {
                                props.users.map((uid) => (<MenuItem key={uid} value={uid}>{uid}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button onClick={handleClick} variant="contained" size="large" >Login</Button>
                </Box>
            </Grid>
        </div>
    );
}

function stateToProps({ users }) {
    return { users: Object.keys(users) }
}

export default connect(stateToProps)(Login);