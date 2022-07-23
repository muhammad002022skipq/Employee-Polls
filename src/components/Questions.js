import { connect } from 'react-redux';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Questions = (props) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="author-avatar" src={props.authorAvatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.authorName}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.questionTimeStamp}
                        </Typography>
                    }
                />
                <Link to={`questions/${props.questionID}`}>
                    < Button variant="outlined" size="large" sx={{ margin: 2 }}>Show</Button>
                </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
}

const mapStateToProps = ({ users, questions }, { questionID }) => {
    const authorName = questions[questionID].author;
    const authorAvatar = users[authorName].avatarURL;
    const questionTimeStamp = new Date(questions[questionID].timestamp).toDateString();

    return { authorName, authorAvatar, questionTimeStamp }
}

export default connect(mapStateToProps)(Questions);