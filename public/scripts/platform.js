/// Core file for the Front-End Teacher's Platform

// Dom Elements
const __questionInput = document.querySelector("#questionInput");
const __chapterInput = document.querySelector("#chapterNameInput");
const __answerInput = document.querySelectorAll(".answer_input");
const __deleteQuestionButton = document.querySelector("#b_delete");
const __saveQuestionButton = document.querySelector("#b_save");
const __correctRadio = document.querySelectorAll(".answerRadio");

const __i_chapters = document.querySelector("#chapters1");
const __o_chapters = document.querySelector("#chapters2");
const __q_container = document.querySelector("#questionsContainer");
let questionsFile,
  chapterSelected = 0,
  pathSelected = 0;

async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

fetchQuestions().then(questions => {
  // Save the fetched file locally in the front-end
  questionsFile = questions;

  // Split the two initial chapters
  let inorganicChapters = questions.inorganic.chapters;
  let organicChapters = questions.organic.chapters;

  // Variable to store upcoming DOM code
  let chapterDOM;

  // Loop over the inorganic chapters
  for (let i = 0; i < inorganicChapters.length; i++) {
    // Assign to each chapter their respective DOM structure
    chapterDOM = `
              <button
                onclick="appear(); questionsToDisplay(1, ${i}); updateSelectedChapter(${i}); updateSelectedPath(${1})"
                class="w-full  tracking-wide text-left p-2 md:p-4 mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
              >
                ${inorganicChapters[i].chapterName}
              </button>`;

    // Attach the DOM code to the chapter container
    __i_chapters.innerHTML += chapterDOM;
  }

  // Loop over the organic chapters
  for (let i = 0; i < organicChapters.length; i++) {
    // Assign to each chapter their respective DOM structure
    chapterDOM = `
              <button
                onclick="appear(); questionsToDisplay(2, ${i}); updateSelectedChapter(${i}); updateSelectedPath(${2})"
                class="w-full  tracking-wide text-left p-2 md:p-4 mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
              >
                ${organicChapters[i].chapterName}
              </button>`;
    // Attach the DOM code to the chapter container
    __o_chapters.innerHTML += chapterDOM;
  }
});

// Main functionality for the first popup
function questionsToDisplay(path, chapter) {
  // Empty question template that will be filled with DOM structure later
  let questionTemplate;

  // Splitting the two initial chapters
  let inorganicChapters = questionsFile.inorganic.chapters;
  let organicChapters = questionsFile.organic.chapters;

  // Question container, initially empty
  __q_container.innerHTML = ``;

  // Code the two chapters in separate ways (1 = inorganic)
  if (path == 1) {
    // Chapter Input Value
    __chapterInput.value = inorganicChapters[chapter].chapterName;

    // Loop over all of the chapter questions
    for (
      let i = 0;
      i < inorganicChapters[chapter].chapterQuestions.length;
      i++
    ) {
      // Construct the DOM structure
      questionTemplate = `<div
            onclick="appearTwo(); modifyQuestionDisplay(1, ${chapter}, ${inorganicChapters[chapter].chapterQuestions[i].questionID})"
            id="questionListitem"
            class="flex justify-between w-full  tracking-wide text-left mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
          >
            <div class="cursor-pointer w-full p-2 md:p-4 truncate">
              ${inorganicChapters[chapter].chapterQuestions[i].question}
            </div>
          </div>`;

      // Attach it to the question container
      __q_container.innerHTML += questionTemplate;
    }
    // Organic chapter
  } else {
    // Loop over all of the chapter questions
    for (let i = 0; i < organicChapters[chapter].chapterQuestions.length; i++) {
      // Construct the DOM structure
      questionTemplate = `<div
            onclick="appearTwo()"
            id="questionListitem"
            class="flex justify-between w-full  tracking-wide text-left mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
          >
            <div class="cursor-pointer w-full p-2 md:p-4 truncate">
              ${organicChapters[chapter].chapterQuestions[i].question}
            </div>
          </div>`;

      // Attach it to the question container
      __q_container.innerHTML += questionTemplate;
    }
  }
}

// Main functionality for the second popup (modify)
function modifyQuestionDisplay(path, chapter, qID) {
  // Code the two chapters accordingly (1 = inorganic)
  if (path == 1) {
    // Load the question's text and answers
    let questionText = questionsFile.inorganic.chapters[
      chapter
    ].chapterQuestions.find(x => x.questionID == qID);

    // Update the question DOM
    __questionInput.value = questionText.question;

    // Loop over the answer's DOM and update them accordingly
    for (let i = 0; i < 3; i++) {
      __answerInput[i].value = questionText.answers[i];
    }
    // Organic chapter
  } else {
  }
}

// Main functionality for the second popup (add)
function addQuestionDisplay(path, chapter) {
  __questionInput.value = "";
  for (let i = 0; i < 3; i++) {
    __answerInput[i].value = "";
  }
}

function updateSelectedChapter(chapter) {
  chapterSelected = chapter;
}

function updateSelectedPath(path) {
  pathSelected = path;
}

// Send a POST request to the back-end server with the Question information
function sendQuestion(path, chapter) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", ".././addQuestion", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  /// This is where I left off, I have to create the question file to send to the back-end

  let correctIndex;
  for (let i = 0; i < 3; i++) {
    if (__correctRadio[i].checked) {
      correctIndex = i + 1;
    }
  }

  let questionTemplate = {
    questionBody: {
      public: true,
      questionID: 0,
      question: __questionInput.value,
      answers: [
        __answerInput[0].value,
        __answerInput[1].value,
        __answerInput[2].value
      ],
      correct: correctIndex,
      explanation: ""
    },
    initial: pathSelected,
    chapter: chapterSelected
  };

  xhr.send(JSON.stringify(questionTemplate));
}
