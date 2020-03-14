/// Core file for the Teacher Platform

const fs = require("fs");

let testFile = JSON.parse(
  fs.readFileSync("./utils/platform/test.json").toString()
);

testFile.name = "Peter";
//delete testFile.test;

function addQuestion(initial, chapter, questionToAdd) {
  questionTemplate = { ...questionToAdd };
  testFile.initial[initial].chapters[chapter].chapterQuestions.push(
    questionToAdd
  );
}
function deleteQuestion(initial, chapter, idx) {
  //delete testFile.initial[initial].chapters[chapter].chapterQuestions[]
}
function editQuestion(initial, chapter, idx) {}

/*addQuestion(1, 0, {
  question: "hello there:",
  answers: ["a", "b", "c"],
  correct: 3,
  explaination: "haha"
});*/
console.log(testFile);

fs.writeFileSync("./utils/platform/test.json", JSON.stringify(testFile));
