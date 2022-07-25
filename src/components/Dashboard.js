import { connect } from "react-redux";
import { Typography } from "@mui/material";
import Questions from "./Questions";
import NavBar from "./NavBar";
const Dashboard = ({ authedUser, users, questions }) => {
  const user = users[authedUser];
  const answeredQuestionsID = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unAnsweredQuestionsID = Object.keys(questions)
    .filter((qID) => !answeredQuestionsID.includes(qID))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <>
      <NavBar />
      <Typography variant="h4" align="center" color="textPrimary">
        New Questions
      </Typography>
      <div>
        <ul>
          {unAnsweredQuestionsID.map((questionID) => (
            <li className="list-remove" key={questionID}>
              <Questions questionID={questionID} />
            </li>
          ))}
        </ul>
      </div>
      <Typography variant="h4" align="center" color="textPrimary">
        Done
      </Typography>
      <div>
        <ul>
          {answeredQuestionsID.map((questionID) => (
            <li className="list-remove" key={questionID}>
              <Questions questionID={questionID} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);
