import { connect } from 'react-redux';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material';

const Questions = (props) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="user-avatar" src={props.userAvatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.userName}
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
                {/* TODO --- Add Link to SelectOption with question id in url */}
                < Button variant="outlined" size="large" style={{ marginLeft: '15px', marginTop: '15px' }}>Show</Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
}

const stateToProps = ({ users, questions }, { questionID }) => {
    const userName = questions[questionID].author;
    const userAvatar = users[userName].avatarURL;
    const questionTimeStamp = new Date(questions[questionID].timestamp).toDateString();

    return { userName, userAvatar, questionTimeStamp }
}

export default connect(stateToProps)(Questions);