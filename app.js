const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let questionArr = [];
let currentQues = 0;
let score = 0;

async function getData() {
    try {
        const res = await axios.get(url);
        questionArr = res.data.results;
        displayQues();
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayQues() {
    const currentQuestion = questionArr[currentQues];
    document.getElementById('questionText').innerHTML = currentQuestion.question;
    const options = shuffleAns([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
        button.onclick = () => checkAnswer(options[index]);
    });
    document.getElementById('currentQuestion').textContent = currentQues + 1;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questionArr[currentQues].correct_answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById('score').textContent = score;
    }
    currentQues++;
    if (currentQues < questionArr.length) {
        displayQues();
    } else {
        alert('Quiz completed! Your final score is ' + score);
        document.getElementById('restartButton').style.display = 'block';
    }
}

function restartGame() {
    currentQues = 0;
    score = 0;
    getData();
    document.getElementById('score').textContent = score;
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('currentQuestion').textContent = '1';
}

function shuffleAns(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextQuestion() {
    if (currentQues < questionArr.length - 1) {
        currentQues++;
        displayQues();
    }
}

function prevQuestion() {
    if (currentQues > 0) {
        currentQues--;
        displayQues();
    }
}

getData();

document.getElementById('restartButton').addEventListener('click', restartGame);
document.getElementById('nextButton').addEventListener('click', nextQuestion);
document.getElementById('prevButton').addEventListener('click', prevQuestion);














