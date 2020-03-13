/// Core file for the Teacher Platform

const fs = require("fs");

let testFile = JSON.parse(
  fs.readFileSync("./utils/platform/test.json").toString()
);

testFile.name = "Peter";
//delete testFile.test;

function addQuestion(initial, chapter) {
  let questionTemplate = {
    question: "",
    answers: ["", "", ""],
    correct: 0,
    explaination: ""
  };
}
function deleteQuestion(initial, chapter, idx) {}
function editQuestion(initial, chapter, idx) {}

console.log(testFile);
fs.writeFileSync("./utils/platform/test.json", JSON.stringify(testFile));
