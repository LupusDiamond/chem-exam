/// Core file for the Front-End Teacher's Platform

// Dom Elements
const __questionInput = document.querySelector("#questionInput");
const __answerInput = document.querySelectorAll(".answer_input");
const __deleteQuestionButton = document.querySelector("#b_delete");
const __saveQuestionButton = document.querySelector("#b_save");

const __i_chapters = document.querySelector("#chapters1");
const __o_chapters = document.querySelector("#chapters2");
const __q_container = document.querySelector("#questionsContainer");
let questionsFile;

async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

fetchQuestions().then(questions => {
  questionsFile = questions;
  let inorganicChapters = questions.inorganic.chapters;
  let organicChapters = questions.organic.chapters;

  let chapterDOM;

  for (let i = 0; i < inorganicChapters.length; i++) {
    chapterDOM = `
              <button
                onclick="appear(); questionsToDisplay(1, ${i})"
                class="w-full  tracking-wide text-left p-2 md:p-4 mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
              >
                ${inorganicChapters[i].chapterName}
              </button>`;
    __i_chapters.innerHTML += chapterDOM;
  }
  for (let i = 0; i < organicChapters.length; i++) {
    chapterDOM = `
              <button
                onclick="appear()"
                class="w-full  tracking-wide text-left p-2 md:p-4 mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
              >
                ${organicChapters[i].chapterName}
              </button>`;
    __o_chapters.innerHTML += chapterDOM;
  }
});

function questionsToDisplay(path, chapter) {
  let questionTemplate;
  console.log(questionsFile);
  let inorganicChapters = questionsFile.inorganic.chapters;
  let organicChapters = questionsFile.organic.chapters;
  __q_container.innerHTML = ``;
  if (path == 1) {
    for (
      let i = 0;
      i < inorganicChapters[chapter].chapterQuestions.length;
      i++
    ) {
      questionTemplate = `<div
            onclick="appearTwo(); modifyQuestionDisplay(1, ${chapter}, ${inorganicChapters[chapter].chapterQuestions[i].questionID})"
            id="questionListitem"
            class="flex justify-between w-full  tracking-wide text-left mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
          >
            <div class="cursor-pointer w-full p-2 md:p-4 truncate">
              ${inorganicChapters[chapter].chapterQuestions[i].question}
            </div>
          </div>`;
      __q_container.innerHTML += questionTemplate;
    }
  } else {
    for (let i = 0; i < organicChapters[chapter].chapterQuestions.length; i++) {
      questionTemplate = `<div
            onclick="appearTwo()"
            id="questionListitem"
            class="flex justify-between w-full  tracking-wide text-left mb-4 bg-gray-300 rounded border-2 border-gray-400 hover:bg-gray-400"
          >
            <div class="cursor-pointer w-full p-2 md:p-4 truncate">
              ${organicChapters[chapter].chapterQuestions[i].question}
            </div>
          </div>`;
      __q_container.innerHTML += questionTemplate;
    }
  }
}

function modifyQuestionDisplay(path, chapter, qID) {
  if (path == 1) {
    let questionText = questionsFile.inorganic.chapters[
      chapter
    ].chapterQuestions.find(x => x.questionID == qID);
    __questionInput.value = questionText.question;
    for (let i = 0; i < 3; i++) {
      __answerInput[i].value = questionText.answers[i];
    }
  } else {
  }
}
