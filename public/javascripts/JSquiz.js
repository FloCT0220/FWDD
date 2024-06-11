document.addEventListener('DOMContentLoaded', () => {
  const questionTextElement = document.getElementById('question-text');
  const trueButton = document.getElementById('true-btn');
  const falseButton = document.getElementById('false-btn');
  const quizContainer = document.getElementById('question-container');
  const questionNumberElement = document.getElementById('question-number');
  const totalQuestionsElement = document.getElementById('total-questions');
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  fetchQuestions();

  trueButton.addEventListener('click', () => {
    checkAnswer(1); 
  });

  falseButton.addEventListener('click', () => {
    checkAnswer(0); 
  });

  function fetchQuestions() {
    fetch('/questions')
      .then(response => response.json())
      .then(data => {
        questions = data;
        totalQuestionsElement.innerText = questions.length; 
        displayQuestion(currentQuestionIndex);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }

  function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionTextElement.innerText = currentQuestion.quiz_question;
    updateQuestionNumber();
  }

  function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.quiz_answer; 

    if (userAnswer == correctAnswer) { 
      score++; 
    } else {
      score; 
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex); 
    } else {
      endGame(); 
    }
  }

  function updateQuestionNumber() {
    questionNumberElement.innerText = currentQuestionIndex + 1;
  }

  function endGame() {
    quizContainer.innerHTML = `<h2>Quiz completed! Your final score is: ${score}</h2>`;
  }
});