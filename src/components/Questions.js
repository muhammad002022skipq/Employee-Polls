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

const Questions = (props) => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="author-avatar" src={props.authorAvatar} />
        </ListItemAvatar>
        <ListItemText
          primary={props.authorName}
          secondary={props.questionTimeStamp}
        />
        <Typography variant="h6" align="left" color="textSecondary">
          {props.question.optionOne.text}
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
          {props.question.optionTwo.text}
        </Typography>
        <Link to={`questions/${props.questionID}`}>
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

export default connect(mapStateToProps)(Questions);
