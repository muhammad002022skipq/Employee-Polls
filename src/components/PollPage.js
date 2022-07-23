import { connect } from 'react-redux';
import { useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { handleSetQuestionAnswer } from '../actions/questions';
import { useParams, Link } from 'react-router-dom';

const PollPage = ({ dispatch, authedUser, questions, users }) => {
    const { questionID } = useParams();
    const [showOptions, setShowOptions] = useState(!Object.keys(users[authedUser].answers).includes(questionID));

    const pollAuthor = users[questions[questionID].author];
    const pollQuestion = questions[questionID];

    const alreadyAnsweredOption = users[authedUser].answers[questionID];

    const votesOptionOne = pollQuestion.optionOne.votes.length;
    const votesOptionTwo = pollQuestion.optionTwo.votes.length;
    const totalVotes = votesOptionOne + votesOptionTwo;

    const handleClickOne = (e) => {
        e.preventDefault();
        dispatch(handleSetQuestionAnswer(authedUser, questionID, 'optionOne'));
        setShowOptions(false);
    }
    const handleClickTwo = (e) => {
        e.preventDefault();
        dispatch(handleSetQuestionAnswer(authedUser, questionID, 'optionTwo'));
        setShowOptions(false);
    }


    console.log("In Poll Page : ", alreadyAnsweredOption);
    return (
        <Box sx={{ marginTop: 5 }}>
            <Link to="/"><strong>Home</strong></Link>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Typography variant="h5" align="center" color="textPrimary"> Poll by {pollAuthor.name} </Typography>
            </Box>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Avatar sx={{ margin: 3, height: 150, width: 150 }} alt="author-avatar" src={pollAuthor.avatarURL} />
            </Box>

            {showOptions && (
                <Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h5" align="center" color="textPrimary"> Would You Rather </Typography>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        < Button onClick={handleClickOne} variant="outlined" size="large" sx={{ margin: 5 }}>{(pollQuestion.optionOne.text)}</Button>
                        < Button onClick={handleClickTwo} variant="outlined" size="large" sx={{ margin: 5 }}>{(pollQuestion.optionTwo.text)}</Button>
                    </Box>
                </Box>
            )}
            {!showOptions && (
                <Box>
                    <Typography variant="h4" align="center" color="textPrimary"> You answered : {((alreadyAnsweredOption === 'optionOne' && pollQuestion.optionOne.text) || (alreadyAnsweredOption === 'optionTwo' && pollQuestion.optionTwo.text))} </Typography>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography sx={{ margin: 7 }} variant="h5" color="textSecondary"> Option One : {(pollQuestion.optionOne.text)}  </Typography>
                        <Typography variant="h5" color="textSecondary"> Option Two : {(pollQuestion.optionTwo.text)}  </Typography>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography sx={{ marginRight: 15 }} variant="h5" color="textSecondary"> {votesOptionOne} Selected Option One  </Typography>
                        <Typography sx={{ marginLeft: 10 }} variant="h5" color="textSecondary"> {votesOptionTwo} Selected Option Two  </Typography>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography sx={{ marginTop: 3, marginRight: 15 }} variant="h5" color="textSecondary"> {(parseFloat((votesOptionOne / totalVotes) * 100).toFixed(2))}% Selected Option One  </Typography>
                        <Typography sx={{ marginLeft: 10 }} variant="h5" color="textSecondary"> {(parseFloat((votesOptionTwo / totalVotes) * 100).toFixed(2))}% Selected Option Two  </Typography>
                    </Box>
                </Box>
            )}
        </Box >
    )
}
const mapStateToProps = ({ authedUser, questions, users }) => {
    return {
        authedUser,
        questions,
        users,
    }
}

export default connect(mapStateToProps)(PollPage);