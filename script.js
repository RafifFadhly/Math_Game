
// untuk membuat angka random dengan batasan max dan min
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min));
}

// untuk membuat operator random
function getRandomOperator() {
    const operators = ['+', '-', 'x', ':'];
    const randomIndex = getRandomNumber(0, operators.length );
    return operators[randomIndex];
}

// untuk menghitung jawaban benar
function Jawab(num1, num2, num3, operator) {
    switch (operator) {
        case '+':
            return num1 + num2 + num3;
        case '-':
            return num1 - num2 - num3;
        case 'x':
            return num1 * num2 * num3;
        case ':':
            return num1 / num2;
        default:
            return NaN;
    }
}

// untuk membuat soal random
function pertanyaan_random() {
    const num1 = getRandomNumber(1, 50);
    const num2 = getRandomNumber(1, 50);
    const num3 = getRandomNumber(1, 50);
    const operator = getRandomOperator();
    const jawaban_benar = Jawab(num1, num2, num3, operator).toFixed(0);
    var soal;
    // jika operator : hanya dua angka yang di bagi untuk menghindari desimal yang terlalu rumit
    if(operator === ":"){
        soal = `${num1} ${operator} ${num2} = ?`
    }else{
        soal = `${num1} ${operator} ${num2} ${operator} ${num3} = ?`
    }
    const question = soal ;
    const options = [
        jawaban_benar.toString(),
        getRandomNumber(-jawaban_benar * 5, jawaban_benar * 5).toString(),
        getRandomNumber(-jawaban_benar * 5, jawaban_benar * 5).toString(),
        getRandomNumber(-jawaban_benar * 5, jawaban_benar * 5).toString()
    ];
    // mengacak jawaban
    shuffleArray(options);

    return {
        question: question,
        options: options,
        correctAnswer: jawaban_benar.toString()
    };
}

// mengacak jawaban
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// untuk membuat array soal dan batas soal
const quizData = [];
const numberOfQuestions = 20;

for (let i = 0; i < numberOfQuestions; i++) {
    quizData.push(pertanyaan_random());
}

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score-value');
const Score = document.getElementById('score');

// untuk memunculkan soal
function loadQuestion() {
    const { question, options } = quizData[currentQuestion];

    questionElement.innerText = question;
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// untuk mengecek jawaban dan menampilkan ini soal ke berapa, jika soal sudah habis maka endQuiz() akan di jalankan
function checkAnswer(userAnswer) {
    const jawaban_benar = quizData[currentQuestion].correctAnswer;

    if (userAnswer === jawaban_benar) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        scoreElement.innerText = currentQuestion + 1 + "/20";
        loadQuestion();
    } else {
        endQuiz();
    }
}

// ika soal sudah habis maka endQuiz() akan di jalankan
function nextQuestion() {
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// untuk mengubah isi dari soal menjadi teks selesai dan memberitaukan nilai serta menampilkan tombol restart
function endQuiz() {
    questionElement.innerText = 'Selesai!';
    optionsContainer.innerHTML = `<h3>Benar: ${score}<br>Salah: ${20-score}<br><br>Nilai: ${((score / 2) * 10).toFixed(1)}</h3>`;
    const restartButton = document.createElement('button');
    restartButton.innerText ="Restart";
    restartButton.addEventListener('click', ()=>restart());
    const restartDiv = document.getElementById('restart');
    restartDiv.appendChild(restartButton);
    Score.innerHTML = "";
    hasil();
}

// untuk menampilkan alert dan merefresh halaman jika tombol restart di tekan
function restart(){
    alert("Yakin Ulangi ingin lagi ?");
    window.location.href = 'Soal.html';
}

// untuk mengubah isi dari bagian cara ngerjai soal menjadi apresiasi dengan kkm nilai 75
const Jhasil = document.getElementById('jhasil');
function hasil(){
    const hasil = document.getElementById('hasil');
    Jhasil.innerHTML = "";
    if((score / 2) * 10 < 75){
        hasil.innerHTML = "yah, belajar lagi ya ^v^"
    }else{
        hasil.innerHTML = "wah, selamat ya ^v^"
    }
}


loadQuestion();
