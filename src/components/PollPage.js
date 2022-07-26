import { connect } from "react-redux";
import { useState } from "react";
import { Divider, Box, Typography, Avatar, Button } from "@mui/material";
import { handleSetQuestionAnswer } from "../actions/questions";
import { useParams, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

const PollPage = ({ dispatch, authedUser, questions, users }) => {
  const { questionID } = useParams();
  const authedUserAnswers = users[authedUser].answers;
  const [showOptions, setShowOptions] = useState(
    !Object.keys(authedUserAnswers).includes(questionID)
  );
  const pollQuestion = questions[questionID];
  if (pollQuestion === undefined) {
    return <Navigate to="/404" replace={true} />;
  }
  const pollAuthor = users[pollQuestion.author];
  const alreadyAnsweredOption = authedUserAnswers[questionID];
  const votesOptionOne = pollQuestion.optionOne.votes.length;
  const votesOptionTwo = pollQuestion.optionTwo.votes.length;
  const totalVotes = votesOptionOne + votesOptionTwo;

  const handleClickOne = (e) => {
    e.preventDefault();
    dispatch(handleSetQuestionAnswer(authedUser, questionID, "optionOne"));
    setShowOptions(false);
  };
  const handleClickTwo = (e) => {
    e.preventDefault();
    dispatch(handleSetQuestionAnswer(authedUser, questionID, "optionTwo"));
    setShowOptions(false);
  };

  return (
    <>
      <NavBar />
      <Typography variant="h5" align="center" color="textPrimary">
        Poll by {pollAuthor.name}
      </Typography>
      <Box className="box-center">
        <Avatar
          sx={{ m: 3, height: 150, width: 150 }}
          alt="author-avatar"
          src={pollAuthor.avatarURL}
        />
      </Box>

      {showOptions && (
        <>
          <Typography variant="h5" align="center" color="textPrimary">
            Would You Rather
          </Typography>
          <Box className="box-center">
            <Button
              onClick={handleClickOne}
              variant="outlined"
              size="large"
              sx={{ m: 5 }}
            >
              {pollQuestion.optionOne.text}
            </Button>
            <Button
              onClick={handleClickTwo}
              variant="outlined"
              size="large"
              sx={{ m: 5 }}
            >
              {pollQuestion.optionTwo.text}
            </Button>
          </Box>
        </>
      )}
      {!showOptions && (
        <>
          <Typography variant="h3" align="center" color="textPrimary">
            {(alreadyAnsweredOption === "optionOne" &&
              pollQuestion.optionOne.text) ||
              (alreadyAnsweredOption === "optionTwo" &&
                pollQuestion.optionTwo.text)}
          </Typography>
          <Divider sx={{ mt: 3, mx: 7 }} />
          <Box className="box-center" sx={{ mt: 4 }}>
            <Typography sx={{ mr: 5 }} variant="h5" color="textSecondary">
              {pollQuestion.optionOne.text}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ ml: 5 }} variant="h5" color="textSecondary">
              {pollQuestion.optionTwo.text}
            </Typography>
          </Box>
          <Box className="box-center" sx={{ mt: 4 }}>
            <Typography sx={{ mr: 5 }} variant="h5" color="textSecondary">
              {votesOptionOne} Voted for Option One
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ ml: 5 }} variant="h5" color="textSecondary">
              {votesOptionTwo} Voted for Option Two
            </Typography>
          </Box>
          <Box className="box-center" sx={{ mt: 4 }}>
            <Typography sx={{ mr: 5 }} variant="h5" color="textSecondary">
              {parseFloat((votesOptionOne / totalVotes) * 100).toFixed(2)}%
              Voted for Option One
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ ml: 5 }} variant="h5" color="textSecondary">
              {parseFloat((votesOptionTwo / totalVotes) * 100).toFixed(2)}%
              Voted for Option Two
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};
const mapStateToProps = ({ authedUser, questions, users }) => {
  return {
    authedUser,
    questions,
    users,
  };
};

PollPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(PollPage);
