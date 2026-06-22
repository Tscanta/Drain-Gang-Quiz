//DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//QUIZ QUESTIONS
const quizQuestions = [
    //QUESTION 1 - EASY
    {
        question: "1. What is Bladee's real name?",
        answers: [
            {"text": "Benjamin Reichwald", "correct": true},
            {"text": "Sonny Moore", "correct": false},
            {"text": "Erik Cloud", "correct": false},
            {"text": "Leandoer", "correct": false}
        ]
    },

    //QUESTION 2 - EASY
    {
        question: "2. Which artist is known as the 'Legendary Member' of Drain Gang?",
        answers: [
            {"text": "Ecco2k", "correct": false},
            {"text": "Thaiboy Digital", "correct": true},
            {"text": "WhiteArmor", "correct": false},
            {"text": "Yung Sherman", "correct": false}
        ]
    },

    //QUESTION 3 - EASY
    {
        question: "3. What country is Drain Gang primarily from?",
        answers: [
            {"text": "United States", "correct": false},
            {"text": "Sweden", "correct": true},
            {"text": "Thailand", "correct": false},
            {"text": "United Kingdom", "correct": false}
        ]
    },

    //QUESTION 4 - MEDIUM
    {
        question: "4. What does Ecco2k's father do professionally?",
        answers: [
            {"text": "Music Producer", "correct": false},
            {"text": "Fashion Designer", "correct": true},
            {"text": "Film Director", "correct": false},
            {"text": "Graphic Designer", "correct": false}
        ]
    },

    //QUESTION 5 - MEDIUM
    {
        question: "5. Which Drain Gang album features 'Gluee' as a notable track?",
        answers: [
            {"text": "Eversince", "correct": false},
            {"text": "Icedancer", "correct": false},
            {"text": "Gluee", "correct": true},
            {"text": "Working for a Living", "correct": false}
        ]
    },

    //QUESTION 6 - MEDIUM
    {
        question: "6. What year did Drain Gang officially form?",
        answers: [
            {"text": "2012", "correct": true},
            {"text": "2010", "correct": false},
            {"text": "2014", "correct": false},
            {"text": "2009", "correct": false}
        ]
    },

    //QUESTION 7 - HARD
    {
        question: "7. Which Drain Gang member is known by the alias 'Gtbsn'?",
        answers: [
            {"text": "Sherman", "correct": false},
            {"text": "Bladee", "correct": false},
            {"text": "Ecco2k", "correct": true},
            {"text": "WhiteArmor", "correct": false}
        ]
    },

    //QUESTION 8 - HARD
    {
        question: "8. What was Thaiboy Digital's immigration status issue in 2019?",
        answers: [
            {"text": "Visa Overstay", "correct": true},
            {"text": "Criminal Record", "correct": false},
            {"text": "Work Permit Expiration", "correct": false},
            {"text": "Deportation Order", "correct": false}
        ]
    },

    //QUESTION 9 - HARDEST
    {
        question: "9. Which record label did Drain Gang members found together?",
        answers: [
            {"text": "Sad Boys Collective", "correct": false},
            {"text": "Year0001", "correct": true},
            {"text": "Gravity Records", "correct": false},
            {"text": "Cloud Rap Inc", "correct": false}
        ]
    },

    //QUESTION 10 - HARDEST
    {
        question: "10. What is the name of the collective that includes Bladee, Yung Lean, and Drain Gang members?",
        answers: [
            {"text": "Sad Boys", "correct": true},
            {"text": "Cloud Rap Gang", "correct": false},
            {"text": "Butterfly Collective", "correct": false},
            {"text": "Echo System", "correct": false}
        ]
    }
];

//QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //RESET VARS
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    //SHOW QUIZ SCREEN
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    //RESET ANSWERS
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        //dataset is used to store custom data attributes on HTML elements. 
        //In this case, we are storing whether the answer is correct or not.
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    //DISABLE FURTHER ANSWER SELECTION
    if(answerDisabled) return;
    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
        scoreSpan.textContent = score;
    } else {
        selectedButton.classList.add("incorrect");
    }

    //MOVE TO NEXT QUESTION AFTER 1 SECOND
    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
}

function restartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.add("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.remove("active");
}
    