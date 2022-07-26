export const GET_USERS = "GET_USERS";
export const SET_USER_ANSWER = "SET_USER_ANSWER";
export const SET_USER_QUESTION = "SET_USER_QUESTION";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function setUserAnswer(authedUser, qid, answer) {
  return {
    type: SET_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function setUserQuestion(authedUser, qid) {
  return {
    type: SET_USER_QUESTION,
    authedUser,
    qid,
  };
}
