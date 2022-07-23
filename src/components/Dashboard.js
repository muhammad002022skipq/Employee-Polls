import { connect } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import Questions from './Questions';

const Dashboard = (props) => {

    //** Add AuthedUser later after including react router **
    const authed = 'mtsamis';
    const user = props.users[authed];

    const answeredQuestionsID = Object.keys(user.answers)
        .sort((a, b) => props.questions[b].timestamp - props.questions[a].timestamp);

    const unAnsweredQuestionsID = Object.keys(props.questions)
        .filter((qID) => !answeredQuestionsID.includes(qID))
        .sort((a, b) => props.questions[b].timestamp - props.questions[a].timestamp);;

    console.log('In dashboard Ans : ', answeredQuestionsID);
    console.log('In dashboard UnAns : ', unAnsweredQuestionsID);

    return (
        <div>
            <Typography variant="h4" align="center" color="textPrimary"> New Questions </Typography>
            <Grid container spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '70vh' }}>

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
            </Grid>
        </div>
    );

}

const stateToProps = (state) => (state);

export default connect(stateToProps)(Dashboard);