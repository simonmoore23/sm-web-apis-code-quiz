var startButton = document.querySelector(".start-button");
var timerCountEl = document.querySelector("#timer");
var questionEl = document.getElementById("question");
var quizContainer = document.querySelector(".quiz-container");
var answerBtns = document.querySelector(".answer-btns"); 
var answerStatus = document.querySelector(".answer-status");
var inputForm = document.querySelector(".input-form");
var userInput = document.querySelector("#initials-input");
var submitBtn = document.getElementById("submit-btn");
var timer;
var timerCountdown = 60;
var index = 0;
var score = 0;
var highScoreArr = [];

function startQuiz() {
    if (index === myQuestions.length) {
        endQuiz();
        return; 
    }
    startButton.style.display = "none";
    quizContainer.classList.replace("hide", "show");
    questionEl.textContent = myQuestions[index].question;
    answerBtns.innerHTML = ""; 
    for (let i = 0; i < myQuestions[i].options.length; i++) {
        const btn = document.createElement("button");
        btn.setAttribute("class", "quiz-btn");
        btn.textContent = myQuestions[index].options[i];
        answerBtns.appendChild(btn); 
    }
}
function setTimeLeft() {
    timer = setInterval(function () {
        timerCountdown--;
        timerCountEl.textContent = timerCountdown;
        if (timerCountdown <= 0) {
            endQuiz();
        }
    }, 1000);
}
answerBtns.addEventListener("click", function (event) {
    if (event.target.matches(".quiz-btn")) {
        checkAnswer(event.target.textContent);
    }
});
function checkAnswer(answer) {
    if (answer === myQuestions[index].answer) {
        answerStatus.textContent = "Correct!";
        answerStatus.style.color = "green";
        setTimeout(function () {
            answerStatus.innerHTML = "";
            index++;
            score++;
            startQuiz();
        }, 1000);
    } else {
        answerStatus.textContent = "Incorrect!";
        answerStatus.style.color = "red";
        setTimeout(function () {
            answerStatus.innerHTML = "";
            index++;
            timerCountdown -= 5;
            startQuiz();
        }, 1000);
    }
}
function endQuiz() {
    clearInterval(timer);
    timerCountdown = 60; 
    quizContainer.style.display = "none";
    inputForm.classList.replace("hide", "show");
}
function storage() {
    var initials = userInput.value;
    if (initials !== "") {
        highScoreArr = JSON.parse(localStorage.getItem("highScores")) || [];
        var userObj = {
            initials: initials,
            score: score
        };
        highScoreArr.push(userObj);
        highScoreArr.sort((a, b) => b.score - a.score); 
        localStorage.setItem("highScores", JSON.stringify(highScoreArr));
        window.location.assign("scorePage.html");
    }
}
startButton.addEventListener("click", function () {
    startQuiz();
    setTimeLeft();
});
submitBtn.addEventListener("click", storage);

const myQuestions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "Extensible Markup Language",
    options: [
      "Extensible Markup Language",
      "Extensible Multiple Language",
      "Extra Multi-Program Language",
      "Examine Multiple Language"
    ]
  }
];
