/// Core file for the Teacher Platform

const fs = require("fs");

let testFile = JSON.parse(
  fs.readFileSync("./utils/platform/test.json").toString()
);

function addQuestion(initial, chapter, questionToAdd) {
  questionTemplate = { ...questionToAdd };
  questionTemplate.questionID = testFile.nextQuestionID;
  testFile.inorganic.chapters[chapter].chapterQuestions.push(questionTemplate);
  testFile.nextQuestionID++;
  fs.writeFileSync("./utils/platform/test.json", JSON.stringify(testFile));
}
function deleteQuestion(initial, chapter, idx) {
  //delete testFile.initial[initial].chapters[chapter].chapterQuestions[]
}
function editQuestion(initial, chapter, idx) {}

module.exports = {
  addQuestion,
  deleteQuestion,
  editQuestion
};
