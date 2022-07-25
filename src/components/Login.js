import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleClick = () => {
    if (user) {
      props.dispatch(setAuthedUser(user));
      if (window.location.pathname === "/") {
        navigate("/");
      }
    } else {
      setError(true);
    }
  };
  return (
    <>
      <Typography
        data-testid="employee-polls"
        sx={{ m: 5 }}
        variant="h3"
        align="center"
        color="textPrimary"
      >
        Employee Polls
      </Typography>
      <Typography variant="h4" align="center" color="textSecondary">
        Login
      </Typography>

      <Box className="box-center">
        <PersonIcon data-testid="icon" sx={{ fontSize: 180 }} />
      </Box>
      <Box className="box-center">
        {error && (
          <Alert data-testid="login-error" severity="error">
            No User Selected!
          </Alert>
        )}
      </Box>
      <Box className="box-center">
        <FormControl data-testid="user-form" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Users</InputLabel>
          <Select
            data-testid="select-user"
            value={user}
            onChange={handleChange}
            label="User"
          >
            {props.users.map((uid) => (
              <MenuItem key={uid} value={uid}>
                {uid}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="box-center">
        <Button
          data-testid="login-btn"
          onClick={handleClick}
          sx={{ m: 2 }}
          variant="contained"
          size="large"
        >
          Login
        </Button>
      </Box>
    </>
  );
};

function mapStateToProps({ users }) {
  return { users: Object.keys(users) };
}

export default connect(mapStateToProps)(Login);
