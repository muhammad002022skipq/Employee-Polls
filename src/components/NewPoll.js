import { connect } from "react-redux";
import { useState } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import NavBar from "./NavBar";
import { handleSetNewQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleChangeOptionOne = (e) => {
    setOptionOne(e.target.value);
  };
  const handleChangeOptionTwo = (e) => {
    setOptionTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSetNewQuestion(optionOne, optionTwo, authedUser));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" color="textPrimary">
          Would You Rather
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          sx={{ m: 2 }}
        >
          Create your own Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="box-center" sx={{ mt: 5, mb: 2 }}>
            <TextField
              fullWidth
              label="Option One"
              variant="outlined"
              value={optionOne}
              onChange={handleChangeOptionOne}
            />
          </Box>
          <Box className="box-center">
            <TextField
              fullWidth
              label="Option Two"
              variant="outlined"
              value={optionTwo}
              onChange={handleChangeOptionTwo}
            />
          </Box>
          <Box className="box-center" sx={{ m: 3 }}>
            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={optionOne === "" || optionTwo === ""}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};
const mapStateToProps = ({ dispatch, authedUser }) => ({
  dispatch,
  authedUser,
});

NewPoll.propTypes = {
  authedUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(NewPoll);
