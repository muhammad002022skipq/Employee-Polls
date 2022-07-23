import { connect } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Questions from './Questions';
const Dashboard = (props) => {
    const { authedUser, users, questions } = props;
    const user = users[authedUser];
    const answeredQuestionsID = Object.keys(user.answers)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const unAnsweredQuestionsID = Object.keys(questions)
        .filter((qID) => !answeredQuestionsID.includes(qID))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);;

    console.log('In dashboard Ans : ', authedUser);

    return (
        <div>
            <Typography variant="h4" align="center" color="textPrimary"> New Questions </Typography>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <ul>
                    {
                        unAnsweredQuestionsID.map((questionID) => (
                            <li className='list-remove' key={questionID}><Questions questionID={questionID} /></li>
                        ))
                    }
                </ul>
            </Box>
            <Typography variant="h4" align="center" color="textPrimary"> Done </Typography>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <ul>
                    {
                        answeredQuestionsID.map((questionID) => (
                            <li className='list-remove' key={questionID}><Questions questionID={questionID} /></li>
                        ))
                    }
                </ul>
            </Box>
        </div>
    );

}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Dashboard);