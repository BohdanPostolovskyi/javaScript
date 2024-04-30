// Константи для стану світлодіодів
const LIGHT_ON = 1;
const LIGHT_OFF = 0;

// Глобальні змінні
let gameMatrix; // матриця станів світлодіодів
let minStepsRequired; // мінімальна кількість ходів для перемоги
let currentSteps = 0; // поточна кількість ходів гравця
let timer; // таймер гри
let isGameWon = false; // флаг перемоги гравця

// Функція, яка завантажує гру при запуску сторінки
window.onload = function() {
    loadGame();
}

// Функція для завантаження гри
function loadGame() {
    // Зчитуємо дані з JSON файлу
    $ajaxifyJS.sendGetRequest('game1.json', function(data) {
        gameMatrix = data.matrix;
        minStepsRequired = data.minimumStepsRequired;

        // Ініціалізуємо гру
        initGame();
    });
}

// Функція для ініціалізації гри
function initGame() {
    // Створюємо ігрове поле
    createGameBoard();
    
    // Додаємо обробники подій для кнопок
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('new-game-btn').addEventListener('click', loadNewGame);
}

// Функція для створення ігрового поля
function createGameBoard() {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Очищаємо контейнер
    
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', toggleLight);
            if (gameMatrix[i][j] === LIGHT_ON) {
                cell.classList.add('on');
            } else {
                cell.classList.add('off');
            }
            gameContainer.appendChild(cell);
        }
    }
}

// Функція для перемикання стану світлодіода
function toggleLight() {
    if (!isGameWon) {
        let row = parseInt(this.dataset.row);
        let col = parseInt(this.dataset.col);

        // Змінюємо стан клітини
        if (gameMatrix[row][col] === LIGHT_ON) {
            gameMatrix[row][col] = LIGHT_OFF;
            this.classList.remove('on');
            this.classList.add('off');
        } else {
            gameMatrix[row][col] = LIGHT_ON;
            this.classList.remove('off');
            this.classList.add('on');
        }

        // Збільшуємо лічильник ходів
        currentSteps++;

        // Перевіряємо, чи гравець виграв
        checkWin();
    }
}

// Функція для перевірки перемоги
function checkWin() {
    let isAllLightsOff = true;
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix[i].length; j++) {
            if (gameMatrix[i][j] === LIGHT_ON) {
                isAllLightsOff = false;
                break;
            }
        }
    }
    if (isAllLightsOff) {
        // Гравець виграв
        isGameWon = true;
        clearInterval(timer);
        if (currentSteps <= minStepsRequired) {
            alert('Ви виграли!');
        } else {
            alert('Ви виграли, але можна було краще!');
        }
    }
}

// Функція для перезапуску гри
function restartGame() {
    currentSteps = 0;
    isGameWon = false;
    clearInterval(timer);
    loadGame();
}

function getRandomJsonFile() {
    const jsonFiles = ['JSONs/matrix_1.json', 'JSONs/matrix_2.json', 'JSONs/matrix_3.json', 'JSONs/matrix_4.json'];
    const randomIndex = Math.floor(Math.random() * jsonFiles.length);
    return jsonFiles[randomIndex];
}

// Функція для завантаження нової гри
function loadNewGame() {
    currentSteps = 0;
    isGameWon = false;
    clearInterval(timer);
    loadGame(getRandomJsonFile());
}
