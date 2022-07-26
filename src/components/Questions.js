import { connect } from "react-redux";
import {
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Questions = ({ question, authorName, authorAvatar, questionTimeStamp, questionID }) => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="author-avatar" src={authorAvatar} />
        </ListItemAvatar>
        <ListItemText
          primary={authorName}
          secondary={questionTimeStamp}
        />
        <Typography variant="h6" align="left" color="textSecondary">
          {question.optionOne.text}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textPrimary"
          sx={{ mx: 2 }}
        >
          OR
        </Typography>
        <Typography variant="h6" align="right" color="textSecondary">
          {question.optionTwo.text}
        </Typography>
        <Link to={`questions/${questionID}`}>
          <Button variant="contained" size="large" sx={{ mx: 5 }}>
            Show
          </Button>
        </Link>
      </ListItem>
      <Divider sx={{ mr: 4, my: 2 }} />
    </List>
  );
};

const mapStateToProps = ({ users, questions }, { questionID }) => {
  const question = questions[questionID];
  const authorName = question.author;
  const authorAvatar = users[authorName].avatarURL;
  const questionTimeStamp = new Date(
    questions[questionID].timestamp
  ).toDateString();

  return { question, authorName, authorAvatar, questionTimeStamp };
};

Questions.propTypes = {
  question: PropTypes.object.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  questionID: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Questions);
