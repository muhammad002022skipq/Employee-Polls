import { connect } from "react-redux";
import { useState } from "react";
import { Box, Switch, Typography } from "@mui/material";
import Questions from "./Questions";
import NavBar from "./NavBar";
const Dashboard = ({ authedUser, users, questions }) => {
  const [showUnAns, setShowUnAns] = useState(true);
  const user = users[authedUser];
  const answeredQuestionsID = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unAnsweredQuestionsID = Object.keys(questions)
    .filter((qID) => !answeredQuestionsID.includes(qID))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const handleChange = () => {
    showUnAns ? setShowUnAns(false) : setShowUnAns(true);
  };

  return (
    <>
      <NavBar />
      <Typography variant="h5" align="center" color="textSecondary">
        Change Polls
      </Typography>
      <Box className="box-center" sx={{ mb: 5 }}>
        <Switch
          checked={showUnAns}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      {showUnAns && (
        <>
          <Typography variant="h4" align="center" color="textPrimary">
            Unanswered Polls
          </Typography>
          <Box>
            <ul>
              {unAnsweredQuestionsID.map((questionID) => (
                <li className="list-remove" key={questionID}>
                  <Questions questionID={questionID} />
                </li>
              ))}
            </ul>
          </Box>
        </>
      )}
      {!showUnAns && (
        <>
          <Typography variant="h4" align="center" color="textPrimary">
            Answered Polls
          </Typography>
          <Box>
            <ul>
              {answeredQuestionsID.map((questionID) => (
                <li className="list-remove" key={questionID}>
                  <Questions questionID={questionID} />
                </li>
              ))}
            </ul>
          </Box>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);
