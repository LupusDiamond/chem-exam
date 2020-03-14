/// Core file for the Review page

// Dom Elements
const __question = document.querySelector("#question");
const __answers = document.querySelectorAll(".answer");
const __attach_q = document.querySelector("#attach-q");

let currentQuestionIndex = 0;

// Fetch questions from JSON file (later changed to database)
async function fetchQuestions() {
  // Fetch file from server
  let f_questions = await fetch("/questions");
  // Format questions to JSON
  f_questions = await f_questions.json();
  return await f_questions;
}

async function displayQuestion(qIndex, qAnswer) {
  let mytestAnswers = JSON.parse(localStorage.getItem("ANSWERS"));
  let questions = await fetchQuestions();
  let myQuestion = await questions.inorganic.chapters[0].chapterQuestions[
    qIndex
  ].question;
  let myAnswers = await questions.inorganic.chapters[0].chapterQuestions[qIndex]
    .answers;
  let corrects = ["", "", "", ""];
  corrects[
    (await questions.inorganic.chapters[0].chapterQuestions[qIndex].correct) - 1
  ] = "correct ";
  let incorrects = ["", "", "", ""];
  let answerText = "";
  if (
    mytestAnswers[qIndex] !=
    (await questions.inorganic.chapters[0].chapterQuestions[qIndex].correct) - 1
  ) {
    incorrects[mytestAnswers[qIndex]] = "incorrect ";
    answerText = `<p class="text-red-600 w-auto  mb-4 rounded-lg text-lg">Wrong.</p>`;
  } else {
    answerText = `<p class="text-green-600 w-auto  mb-4 rounded-lg text-lg">Correct!</p>`;
  }
  let explaination = await questions.inorganic.chapters[0].chapterQuestions[
    qIndex
  ].explaination;
  let questionDOM = `<div class="my-6 md:my-8">
            <!-- Question -->
            <p
              class="mb-4 text-gray-700 text-lg md:text-xl "
            >
             ${qIndex + 1}. ${await myQuestion}
            </p>
            <!-- Answers -->
            ${answerText}

            <p
              class="${await corrects[0]} ${await incorrects[0]} answer tracking-wider text-lg text-left  w-full p-4 mb-4 border-2 border-gray-400 bg-gray-300 text-gray-700 rounded"
            >
              A. ${await myAnswers[0]}
            </p>
            <p
              class="${await corrects[1]} ${await incorrects[1]} answer tracking-wider text-lg text-left  w-full p-4 mb-4 border-2 border-gray-400 bg-gray-300 text-gray-700 rounded"
            >
              B. ${await myAnswers[1]}
            </p>
            <p
              class="${await corrects[2]} ${await incorrects[2]} answer tracking-wider text-lg text-left  w-full p-4 mb-4 border-2 border-gray-400 bg-gray-300 text-gray-700 rounded"
            >
              C. ${await myAnswers[2]}
            </p>

            <!-- Explanation -->

            <p class="mt-6 text-yellow-700 text-lg md:text-xl ">
              <svg
                class="transform -translate-y-px inline h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span
                >Explanation :
                <span id="explanation"
                  >${await explaination}
                </span>
              </span>
            </p>
          </div><!-- NICE HR -->
            <div class="h-px w-11/12 bg-gray-300 border border-gray-300 rounded mx-auto"></div>`;

  return await questionDOM;
}

fetchQuestions().then(questions => {
  console.log("ji!");
  for (
    let i = questions.inorganic.chapters[0].chapterQuestions.length - 1;
    i >= 0;
    i--
  ) {
    //currentQuestion = inorganic.chapters[0].chapterQuestions[i].question;
    displayQuestion(i).then(res => {
      __attach_q.innerHTML += res;
      //console.log(res);
    });
  }
});
