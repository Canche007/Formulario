const welcomeButton = document.getElementById('welcome-btn');
const startButton = document.getElementById('start-btn');
const rulesPopup = document.getElementById('rules-popup');
const quizContainer = document.getElementById('quiz-container');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionNumberElement = document.getElementById('question-number');

const questions = [
    { question: "¿Quién es el creador de Dragon Ball?", answers: ["Akira Toriyama", "Masashi Kishimoto", "Eiichiro Oda", "Rumiko Takahashi"], correct: 0 },
    { question: "¿Cuál es la transformación más poderosa de Goku?", answers: ["Super Saiyajin 3", "Ultra Instinto", "Super Saiyajin Blue", "Kaio-ken"], correct: 1 },
    { question: "¿Quién es el villano principal de toda la zaga de Dragon Ball Z?", answers: ["Cell", "Freezer", "Majin Buu", "Raditz"], correct: 1 },
    { question: "¿Cuál es la técnica de teletransportación de Goku?", answers: ["Kamehameha", "Genkidama", "Instantánea", "Kaio-ken"], correct: 2 },
    { question: "¿Cuál es el nombre completo de Vegeta?", answers: ["Vegeta Jr.", "Vegeta IV", "Vegeta Blue", "Vegeta Saiyan"], correct: 1 },
    { question: "¿Qué significa “Kamehameha”?", answers: ["Ola de la Tortuga", "Onda de Energía", "Ataque Especial", "Puño del Dragón"], correct: 0 },
    { question: "¿Cuál es el nombre del planeta natal de los Saiyajin?", answers: ["Planeta Vegeta", "Planeta Namek", "Planeta Tierra", "Planeta Kaio"], correct: 0 },
    { question: "¿Cuál es el nombre del dragón que concede deseos en la tierra?", answers: ["Shenlong", "Porunga", "Polunga", "Ender Dragon"], correct: 0 },
    { question: "¿Cuál es el nombre del planeta donde se encuentra la Torre de Karin?", answers: ["Planeta Sagrado", "Planeta Kaio", "Planeta Namek", "Planeta Tierra"], correct: 3 },
    { question: "¿Quién es el padre de Goku?", answers: ["Bardock", "Raditz", "Nappa", "Vegeta"], correct: 0 },
    { question: "¿Cuál es el nombre del segundo hijo de Goku y Chichi?", answers: ["Gohan", "Goten", "Trunks", "Pan"], correct: 1 },
    { question: "¿Cuál es la raza de Freezer?", answers: ["Arcosian", "Namekiano", "Saiyajin", "Terrícola"], correct: 0 },
    { question: "¿Quién es el Dios de la Destrucción en el Universo 7?", answers: ["Beerus", "Champa", "Whis", "Krillin"], correct: 0 },
    { question: "¿Cuál es la técnica de Krilin?", answers: ["Kienzan", "Kamehameha", "Genkidama", "Kaio-ken"], correct: 1 },
    { question: "¿Quién es el mejor amigo de Goku?", answers: ["Whis", "Piccolo", "Yamcha", "Krillin"], correct: 3 },
    { question: "¿Cuál es el nombre del planeta donde vive Bills?", answers: ["Planeta Kaio", "Planeta Vegeta", "Planeta Namek", "Templo"], correct: 3 },
    { question: "¿Quién es el príncipe de los Saiyajin?", answers: ["Vegeta", "Raditz", "Nappa", "Tarble"], correct: 0 },
    { question: "¿Qué significa “Kaioken”?", answers: ["Golpe de kaito", "Ola de la Tortuga", "Onda de Energía", "Ataque Especial"], correct: 0 },
    { question: "¿Cuál es la técnica de Tenshinhan?", answers: ["Kikoho", "Kamehameha", "Genkidama", "Kaio-ken"], correct: 0 },
    { question: "¿Quién es Lazuli?", answers: ["Androide 16", "Androide 17", "Androide 18", "Androide 19"], correct: 2 },
    { question: "¿Cuál es la transformación de Gohan en la saga de Cell?", answers: ["Super Saiyajin 2", "Super Saiyajin", "Super Saiyajin 3", "Ultra Instinto"], correct: 0 },
    { question: "¿Quién es el Dios de la Creación en el Universo 7?", answers: ["Whis", "Bills", "Yisus", "Vados"], correct: 0 },
    { question: "¿Quién es el líder de los androides?", answers: ["Dr. Gero", "C-17", "C-18", "C-16"], correct: 0 },
    { question: "¿Cuál es la técnica de Masenko?", answers: ["Krilin", "Yamcha", "Gohan", "Vegueta"], correct: 0 },
    { question: "¿Quién es el enemigo principal en la saga de Cell?", answers: ["Cell", "Freezer", "Majin Buu", "Raditz"], correct: 0 },
    { question: "¿Cuál es el nombre del hijo de Vegeta y Bulma del futuro?", answers: ["Bra", "Trunks", "Goten", "Trunks del Futuro"], correct: 3 },
    { question: "¿Qué significa “Zenkai”?", answers: ["Poder de Recuperación Saiyajin", "Transformación Saiyajin", "Técnica de Regeneración", "Técnica de Teletransportación"], correct: 0 },
    { question: "¿Cual fue la nueva fase de Gohan en la pelicula Dragon Ball Super: Super Hero?", answers: ["Gohan definitivo", "Gohan Fase 4", "Gohan Bestia", "Gohan ultra instinto"], correct: 2 }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

document.getElementById('start-button').addEventListener('click', startExam);
document.getElementById('next-button').addEventListener('click', showNextQuestion);
document.getElementById('retry-button').addEventListener('click', retryExam);
document.getElementById('exit-button').addEventListener('click', () => location.reload());

function startExam() {
    shuffledQuestions = shuffleArray([...questions]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('exam-screen').style.display = 'block';
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length) {
        const questionObj = shuffledQuestions[currentQuestionIndex];
        document.getElementById('question-container').innerHTML = `
            <h2>${questionObj.question}</h2>
            ${questionObj.answers.map((answer, index) => `<button onclick="selectAnswer(${index})">${answer}</button>`).join('')}
        `;
        document.getElementById('next-button').style.display = 'none';
        startTimer();
    } else {
        endExam();
    }
}

function selectAnswer(selectedIndex) {
    const questionObj = shuffledQuestions[currentQuestionIndex];
    clearInterval(timer);

    if (selectedIndex === questionObj.correct) {
        score++;
        document.querySelectorAll('#question-container button')[selectedIndex].classList.add('correct');
    } else {
        document.querySelectorAll('#question-container button')[selectedIndex].classList.add('incorrect');
        document.querySelectorAll('#question-container button')[questionObj.correct].classList.add('correct');
    }
    document.getElementById('next-button').style.display = 'block';
    currentQuestionIndex++;
}

function startTimer() {
    let timeRemaining = timeLimit;
    document.getElementById('timer').innerText = timeRemaining;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').innerText = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            document.querySelectorAll('#question-container button')[shuffledQuestions[currentQuestionIndex].correct].classList.add('correct');
            document.getElementById('next-button').style.display = 'block';
            currentQuestionIndex++;
        }
    }, 1000);
}

function endExam() {
    document.getElementById('exam-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    let resultMessage;
    if (score >= 8) {
        resultMessage = `¡Excelente trabajo! Obtuviste ${score} aciertos.`;
    } else if (score >= 5) {
        resultMessage = `¡Buen trabajo! Obtuviste ${score} aciertos.`;
    } else if (score >= 1) {
        resultMessage = `Obtuviste ${score} aciertos. Sigue practicando.`;
    } else {
        resultMessage = `Obtuviste 0 aciertos. ¡Intenta de nuevo!`;
    }
    document.getElementById('result-message').innerText = resultMessage;
}

function retryExam() {
    document.getElementById('result-screen').style.display = 'none';
    startExam();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}