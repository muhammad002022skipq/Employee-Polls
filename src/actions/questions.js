import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { setUserAnswer, setUserQuestion } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const SET_NEW_QUESTION = "SET_NEW_QUESTION";

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

function setNewQuestion(question) {
  return {
    type: SET_NEW_QUESTION,
    question,
  };
}

export function handleSetQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer({ authedUser, qid, answer }).then((res) => {
      dispatch(setUserAnswer(authedUser, qid, answer));
      dispatch(setQuestionAnswer(authedUser, qid, answer));
      dispatch(hideLoading());
    });
  };
}

export function handleSetNewQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(setUserQuestion(author, question.id));
        dispatch(setNewQuestion(question));
        dispatch(hideLoading());
      }
    );
  };
}
