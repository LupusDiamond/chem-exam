/// Core EXAM page logic

// DOM Elements
const __question = document.querySelector("#question");
const __answers = document.querySelectorAll(".answer");
const __next = document.querySelector("#b_next");
const __previous = document.querySelector("#b_previous");

let currentQuestionIndex = 0;

const myAnswers = [0, 0, 0, 0, 0, 0, 0, 0];

// Fetch questions from JSON file (later changed to database)
async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

function updateQuestion() {
  fetchQuestions().then(questions => {
    //__question.innerHTML = questions.question;
    let inorganic = questions.inorganic;
    let organic = questions.organic;

    let currentQuestion =
      inorganic.chapters[0].chapterQuestions[currentQuestionIndex].question;
    let currentAnswers =
      inorganic.chapters[0].chapterQuestions[currentQuestionIndex].answers;
    __question.innerHTML =
      "" + (currentQuestionIndex + 1) + ". " + currentQuestion;

    for (let i = 0; i < __answers.length; i++) {
      function selectAnswer() {
        chooseAnswer(currentQuestionIndex, i);
      }
      __answers[i].innerHTML =
        "" + String.fromCharCode(65 + i) + ". " + currentAnswers[i];
      __answers[i].onclick = selectAnswer;
    }
  });
}

function loadNextQuestion() {
  currentQuestionIndex++;
  updateQuestion();
}

function loadPreviousQuestion() {
  currentQuestionIndex--;
  updateQuestion();
}

__next.addEventListener("click", () => {
  if (currentQuestionIndex < 2) {
    loadNextQuestion();
  }
});

__previous.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    loadPreviousQuestion();
  }
});

function chooseAnswer(qIndex, aIndex) {
  myAnswers[qIndex] = aIndex;
  console.log(myAnswers);
}

updateQuestion();
