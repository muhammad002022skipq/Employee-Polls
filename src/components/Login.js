import { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Login = (props) => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser(e.target.value);
    }

    const handleClick = () => {
        if (user) {
            props.dispatch(setAuthedUser(user));
            navigate('/');
        }
        else {
            alert('No user selected');
        }
    }

    console.log('In login : ', props);
    return (
        <div>
            <Typography sx={{ margin: 5 }} variant="h3" align="center" color="textPrimary"> Employee Polls </Typography>
            <Typography variant="h4" align="center" color="textSecondary">Login </Typography>

            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <PersonIcon sx={{ fontSize: 180 }} />
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
                <Button onClick={handleClick} sx={{ margin: 2 }} variant="contained" size="large" >Login</Button>
            </Box>
        </div>
    );
}

function mapStateToProps({ users }) {
    return { users: Object.keys(users) }
}

export default connect(mapStateToProps)(Login);