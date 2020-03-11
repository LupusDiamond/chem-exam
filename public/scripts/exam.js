/// Core EXAM page logic

// DOM Elements
const __question = document.querySelector("#question");
const __answers = document.querySelectorAll(".answer");

// Fetch questions from JSON file (later changed to database)
async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

fetchQuestions().then(questions => {
  //__question.innerHTML = questions.question;
  let inorganic = questions.inorganic;
  let organic = questions.organic;

  let currentQuestion = inorganic.chapters[0].chapterQuestions[0].question;
  let currentAnswers = inorganic.chapters[0].chapterQuestions[0].answers;
  __question.innerHTML = currentQuestion;
  for (let i = 0; i < __answers.length; i++) {
    __answers[i].innerHTML =
      "" + String.fromCharCode(65 + i) + ". " + currentAnswers[i];
  }
});

console.log(questions);
