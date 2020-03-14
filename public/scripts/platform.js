/// Core file for the Front-End Teacher's Platform

// Dom Elements
const __questionInput = document.querySelector("#questionInput");
const __answerInput = document.querySelectorAll(".answer_input");
const __deleteQuestionButton = document.querySelector("#b_delete");
const __saveQuestionButton = document.querySelector("#b_save");

const __i_chapters = document.querySelector("#chapters1");
const __o_chapters = document.querySelector("#chapters2");

async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

fetchQuestions().then(questions => {
  let inorganicChapters = questions.inorganic.chapters;
  let organicChapters = questions.organic.chapters;

  let chapterDOM;

  for (let i = 0; i < inorganicChapters.length; i++) {
    chapterDOM = `
              <button
                onclick="appear()"
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
