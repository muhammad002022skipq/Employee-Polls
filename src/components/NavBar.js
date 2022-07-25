import { connect } from "react-redux";
import { Typography, AppBar, Toolbar, Button, Avatar } from "@mui/material";
import { setAuthedUser } from "../actions/authedUser";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ authedUser, dispatch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
    navigate("/");
  };
  return (
    <AppBar color="transparent" position="static" sx={{ mt: 1, mb: 5 }}>
      <Toolbar>
        <Link to="/">
          <Button color="inherit" sx={{ mr: 5 }}>
            Dashboard
          </Button>
        </Link>
        <Link to="/leaderboard">
          <Button color="inherit" sx={{ mr: 5 }}>
            Leaderboard
          </Button>
        </Link>
        <Link to="/add">
          <Button color="inherit" sx={{ mr: 5 }}>
            New Poll
          </Button>
        </Link>
        <Avatar
          alt="athedUser-avatar"
          sx={{ ml: 75 }}
          src={authedUser.avatarURL}
        />
        <Typography variant="h6" color="textSecondary" sx={{ ml: 1 }}>
          {authedUser.id}
        </Typography>
        <Button onClick={handleLogout} color="inherit" sx={{ mx: 1 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  authedUser: users[authedUser],
});

export default connect(mapStateToProps)(NavBar);
