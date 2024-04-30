let LIGHT_ON = 1;
let LIGHT_OFF = 0;

let gameMatrix;
let minStepsRequired;
let currentSteps = 0;
let timer;
let isGameWon = false;

window.onload = function() {
    loadGame();
}

function loadGame() {
    $ajaxifyJS.sendGetRequest(getRandomJsonFile(), function(data) {
        gameMatrix = data.matrix;
        minStepsRequired = data.minimumStepsRequired;
        document.getElementById("minSteps").textContent = "Мінімальна кількість кроків для перемоги: " + minStepsRequired;

        initGame();
    });
}

function initGame() {
    createGameBoard();
    startTimer();
    
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('new-game-btn').addEventListener('click', loadNewGame);
}

function createGameBoard() {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    
    for (let i = 0; i < gameMatrix.length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        
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
            
            row.appendChild(cell);
        }
        
        gameContainer.appendChild(row);
    }
}

function toggleLight() {
    if (!isGameWon) {
        let row = parseInt(this.dataset.row);
        let col = parseInt(this.dataset.col);

        if (gameMatrix[row][col] === LIGHT_ON) {
            gameMatrix[row][col] = LIGHT_OFF;
            this.classList.remove('on');
            this.classList.add('off');
        } else {
            gameMatrix[row][col] = LIGHT_ON;
            this.classList.remove('off');
            this.classList.add('on');
        }

        currentSteps++;
        document.getElementById("steps").textContent = `Кроки: ${currentSteps}`;

        changeAdjacentLights(row, col);
        checkWin();
    }
}

function changeAdjacentLights(row, col) {
    changeLightState(row - 1, col);
    changeLightState(row + 1, col);
    changeLightState(row, col - 1);
    changeLightState(row, col + 1);
}

function changeLightState(row, col) {
    if (row >= 0 && row < gameMatrix.length && col >= 0 && col < gameMatrix[0].length) {
        let cell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
        if (cell) {
            if (gameMatrix[row][col] === LIGHT_ON) {
                gameMatrix[row][col] = LIGHT_OFF;
                cell.classList.remove('on');
                cell.classList.add('off');
            } else {
                gameMatrix[row][col] = LIGHT_ON;
                cell.classList.remove('off');
                cell.classList.add('on');
            }
        }
    }
}

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
        isGameWon = true;
        clearInterval(timer);
        setTimeout(function() {
            if (currentSteps <= minStepsRequired) {
                alert('Ви виграли!');
            } else {
                alert('Ви виграли, але можна було краще!');
            }
        }, 100);
    }
}

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

function loadNewGame() {
    currentSteps = 0;
    isGameWon = false;
    clearInterval(timer);
    loadGame(getRandomJsonFile());
}

function startTimer() {
    let startTime = Date.now();
    timer = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        let seconds = Math.floor(elapsedTime / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        document.getElementById("timer").textContent = `Час: ${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }, 1000);
}
