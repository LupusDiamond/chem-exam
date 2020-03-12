// basic dom require
const startButton = $("#start-btn");
const controls = $(".controls");
const quesContainerElement = $("#question-container");
const quesElement = $("#question");
const answerButtons = $("#answer-button");


// ques === question (global)


// const random displaying questions
let shuffledQues, currentQuestionIndex

startButton.on("click", startGame);

function startGame() {

    startButton.addClass("hide");
    shuffledQues = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    quesContainerElement.removeClass("hide");
    selectNextQues();
};

function selectNextQues() {
    resetStats() //for removing btns
    showQues(shuffledQues[currentQuestionIndex])
};

function showQues(question) {
    quesElement.text(question.question)
    question.answers.forEach(answer => {

        // creating a new button element to load answer from data
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.append(button);

    });
};

// for reseting btns

//check why all buttons are not removed
function resetStats() {
    controls.addClass("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    controls.removeClass('hide');
};
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    };
}
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
};