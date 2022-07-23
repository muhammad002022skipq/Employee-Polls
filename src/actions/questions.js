import { _saveQuestionAnswer } from "../utils/_DATA";
import { setUserAnswer } from "./users";

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    };
}

function setQuestionAnswer(authedUser, qid, answer) {
    return {
        type: SET_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,
    };
}

export function handleSetQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        return _saveQuestionAnswer({ authedUser, qid, answer }).then((res) => {
            dispatch(setUserAnswer(authedUser, qid, answer));
            dispatch(setQuestionAnswer(authedUser, qid, answer));
            console.log("Data saved : ", res);
        }).catch((err) => {
            console.warn("Error in handleSetQuestionAnswer : ", err);
        })
    }
}