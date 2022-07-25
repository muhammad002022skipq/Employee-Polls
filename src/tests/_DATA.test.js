import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("Test for _saveQuestion", () => {
  it("verify that the saved question is returned", async () => {
    let question = {
      optionOneText: "Demo option one",
      optionTwoText: "Demo option two",
      author: "demouser",
    };
    let results = await _saveQuestion(question);
    expect(results.optionOne.text).toEqual(question.optionOneText);
    expect(results.optionTwo.text).toEqual(question.optionTwoText);
    expect(results.author).toEqual(question.author);
  });
  it("verify that an error is returned for incorrect data", async () => {
    let question = {
      optionOneText: "Demo option one",
      author: "demouser",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("Test for _saveQuestionAnswer", () => {
  it("verify that the true is returned for correct data", async () => {
    let data = {
      answer: "optionTwo",
      qid: "loxhs1bqm25b708cmbf3g",
      authedUser: "tylermcginnis",
    };
    let results = await _saveQuestionAnswer(data);
    expect(results).toEqual(true);
  });
  it("verify that an error is returned for incorrect data", async () => {
    let data = {
      answer: "optionTest",
      qid: "testid",
    };
    await expect(_saveQuestionAnswer(data)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
