const adjectives = [
    { word: "Kind", correct: "Amable" },
    { word: "Friendly", correct: "Amistoso" },
    { word: "Smart", correct: "Inteligente" },
    { word: "Loyal", correct: "Leal" },
    { word: "Creative", correct: "Creativo" },
    { word: "Charming", correct: "Encantador" },
    { word: "Hardworking", correct: "Trabajador" },
    { word: "Generous", correct: "Generoso" },
    { word: "Confident", correct: "Seguro de sí mismo" },
    { word: "Adventurous", correct: "Aventurero" },
    { word: "Ambitious", correct: "Ambicioso" },
    { word: "Cheerful", correct: "Alegre" },
    { word: "Patient", correct: "Paciente" },
    { word: "Caring", correct: "Cariñoso" },
    { word: "Optimistic", correct: "Optimista" },
    { word: "Shy", correct: "Tímido" },
    { word: "Stubborn", correct: "Terco" },
    { word: "Arrogant", correct: "Arrogante" },
    { word: "Impatient", correct: "Impaciente" },
    { word: "Lazy", correct: "Perezoso" },
    { word: "Selfish", correct: "Egoísta" },
    { word: "Pessimistic", correct: "Pesimista" },
    { word: "Cold", correct: "Frío (emocionalmente)" },
    { word: "Rude", correct: "Grosero" },
    { word: "Clumsy", correct: "Torpe" },
    { word: "Tall", correct: "Alto" },
    { word: "Short", correct: "Bajo" },
    { word: "Slim", correct: "Delgado" },
    { word: "Strong", correct: "Fuerte" },
    { word: "Attractive", correct: "Atractivo" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function getRandomOptions(correct, allWords) {
    const options = [correct];
    while (options.length < 3) {
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)].correct;
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const feedbackContainer = document.getElementById("feedback");

    clearTimeout(timer); // Clear any previous timer
    const currentAdjective = adjectives[currentQuestionIndex];
    const options = getRandomOptions(currentAdjective.correct, adjectives);

    questionContainer.textContent = `What is the meaning of "${currentAdjective.word}"?`;
    optionsContainer.innerHTML = "";
    feedbackContainer.textContent = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option, currentAdjective.correct, button);
        optionsContainer.appendChild(button);
    });

    // Start the timer
    timer = setTimeout(() => {
        disableOptions();
        feedbackContainer.textContent = `Time's up! The correct answer was "${currentAdjective.correct}".`;
        feedbackContainer.style.color = "red";
        updateScore(-1);
        moveToNextQuestion();
    }, 5000); // 5 seconds to answer
}

function checkAnswer(selected, correct, button) {
    const feedbackContainer = document.getElementById("feedback");
    disableOptions();

    if (selected === correct) {
        feedbackContainer.textContent = "Correct! 🎉";
        feedbackContainer.style.color = "green";
        updateScore(1);
    } else {
        feedbackContainer.textContent = `Wrong! ❌ The correct answer was "${correct}".`;
        feedbackContainer.style.color = "red";
        button.style.backgroundColor = "red";
        updateScore(-1);
    }

    moveToNextQuestion();
}

function disableOptions() {
    const buttons = document.querySelectorAll(".option");
    buttons.forEach(button => button.classList.add("disabled"));
}

function moveToNextQuestion() {
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < adjectives.length) {
            loadQuestion();
        } else {
            document.getElementById("question").textContent = "Quiz completed!";
            document.getElementById("options").innerHTML = "";
            document.getElementById("feedback").textContent = `Your final score is ${score}`;
        }
    }, 2000); // Delay before moving to the next question
}

function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
}

// Start the game
loadQuestion();
