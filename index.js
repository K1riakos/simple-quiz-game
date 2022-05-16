const url = "https://opentdb.com/api.php?amount=11&type=multiple"
let currentQuestion = 0
let questions
let rand
let correctAnswers = 0
let answersArr = []

class Answer {
  constructor(question, answer, correctAnswer) {
    this.question = question
    this.myAnswer = answer
    this.correctAnswer = correctAnswer
  }
}

const getQuestions = () => {
  fetch(url)
    .then((res) => res.json())
    .then((d) => {
      displayer(d.results)
    })
}

/* elements */
const inputs = document.querySelectorAll("input")
const labels = document.querySelectorAll("label")
const btn = document.querySelector("#btn")
const questionField = document.querySelector("#question")
const questionCategoryField = document.querySelector("#question_category")
const questionDifficultyField = document.querySelector("#small")
const option1 = document.querySelector(".o1")
const option2 = document.querySelector(".o2")
const option3 = document.querySelector(".o3")
const exitBtn = document.querySelector("#x")
const popup = document.querySelector("#popup-container")
const corrAnswers = document.querySelector("#corrAnswers")
/* end  */

function displayer(data = questions) {
  questions = data
  questionCategoryField.innerText = questions[currentQuestion].category
  questionField.innerHTML = questions[currentQuestion].question
  questionDifficultyField.innerText = `Difficulty: ${questions[currentQuestion].difficulty}`
  rand = Math.floor(Math.random() * 3)
  option1.innerHTML =
    rand == 0
      ? questions[currentQuestion].correct_answer
      : questions[currentQuestion].incorrect_answers[0]
  option2.innerHTML =
    rand == 1
      ? questions[currentQuestion].correct_answer
      : questions[currentQuestion].incorrect_answers[1]
  option3.innerHTML =
    rand == 2
      ? questions[currentQuestion].correct_answer
      : questions[currentQuestion].incorrect_answers[2]
}

function getAnswer() {
  let question = questions[currentQuestion].question
  var ma // my answer
  let ca = questions[currentQuestion].correct_answer
  if (currentQuestion < 10) {
    inputs.forEach((input, i) => {
      if (input.checked) {
        if (i == rand) {
          correctAnswers++
          ma = questions[currentQuestion].correct_answer
        } else {
          ma = questions[currentQuestion].incorrect_answers[i]
        }
      }
    })
    currentQuestion++
    displayer()
    let ansr = new Answer(question, ma, ca)
    answersArr.push(ansr)
  } else {
    corrAnswers.innerText = correctAnswers
    popup.classList.toggle("hide")
    console.log(answersArr)
  }
}

exitBtn.addEventListener("click", (e) => {
  popup.classList.toggle("hide")
  getQuestions()
  currentQuestion = 0
})

window.onload = getQuestions()

btn.addEventListener("click", getAnswer)
