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
    checkAnswer(1); // Assuming 1 represents true
  });

  falseButton.addEventListener('click', () => {
    checkAnswer(0); // Assuming 0 represents false
  });

  function fetchQuestions() {
    fetch('/questions')
      .then(response => response.json())
      .then(data => {
        questions = data;
        totalQuestionsElement.innerText = questions.length; // Set the total number of questions
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
    const correctAnswer = currentQuestion.quiz_answer; // Assuming quiz_answer is a boolean or string 'true'/'false'

    if (userAnswer == correctAnswer) { // Using == to compare number with string if necessary
      score++; // Increment score for correct answer
    } else {
      score; // Decrement score for incorrect answer
    }

    // Move to the next question or end the game
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex); // Display the next question
    } else {
      endGame(); // Display final score if all questions are answered
    }
  }

  function updateQuestionNumber() {
    questionNumberElement.innerText = currentQuestionIndex + 1;
  }

  function endGame() {
    quizContainer.innerHTML = `<h2>Quiz completed! Your final score is: ${score}</h2>`;
    // nextButton.style.display = 'none'; // Hide the next button after the quiz ends
  }
});