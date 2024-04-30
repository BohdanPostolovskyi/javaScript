document.addEventListener("DOMContentLoaded", function() {
    
    let name = document.getElementById("name");
    let gameContainer = document.getElementById("game-container");
    let startButton = document.getElementById("start-button");
    let difficultySelect = document.getElementById("difficult");
    let colorSelect = document.getElementById("color");

    let timerDisplay;
    let square;
    let clickCountDisplay;

    startButton.addEventListener("click", startGame);

    function startGame() {
        name.style.display = "none";

        let difficulty = difficultySelect.value;
        let color = colorSelect.value;
        let content = `
            
            <div id="game-board"></div>
            <p>Pixel Hunt</p>
            <p id='score'>Очки: 0</p>
            <p id='timer'>Час для кліку:</p>
            <div id='square'></div>
        `;
        gameContainer.innerHTML = content;

        const gameBoard = document.getElementById("game-board");
        square = document.getElementById("square");
        clickCountDisplay = document.getElementById("score");
        timerDisplay = document.getElementById("timer");

        let clickCount = 0;
        let timer;
        square.style.backgroundColor = color;

        square.addEventListener("click", function() {
            clickCount++;
            clickCountDisplay.textContent = "Очки: " + clickCount;

            //const maxWidth = window.innerWidth - square.clientWidth;
            //const maxHeight = window.innerHeight - square.clientHeight;
            const maxWidth = gameBoard.clientWidth - square.clientWidth;
            const maxHeight = gameBoard.clientHeight - square.clientHeight;

            //const randomX = Math.floor(Math.random() * maxWidth);
            //const randomY = Math.floor(Math.random() * maxHeight);
            const randomX = Math.max(0, Math.min(Math.floor(Math.random() * maxWidth ), maxWidth));
            const randomY = Math.max(0, Math.min(Math.floor(Math.random() * maxHeight), maxHeight));
            square.style.left = randomX + "px";
            square.style.top = randomY + "px";
            resetTimer();
        });

        let timeLimit;
        switch(difficulty) {
            case "noob":
                gameBoard.style.width = "300px";
                gameBoard.style.height = "300px";
                square.style.width = "150px";
                square.style.height = "150px";

                timeLimit = 20000;
                break;
            case "easy":
                gameBoard.style.width = "400px";
                gameBoard.style.height = "300px";
                square.style.width = "70px";
                square.style.height = "70px";

                timeLimit = 4000;
                break;
            case "medium":
                gameBoard.style.width = "700px";
                gameBoard.style.height = "400px";
                square.style.width = "50px";
                square.style.height = "50px";

                timeLimit = 2000;
                break;
            case "hard":
                gameBoard.style.width = "900px";
                gameBoard.style.height = "570px";
                square.style.width = "30px";
                square.style.height = "30px";

                timeLimit = 1000;
                break;
            case "imposible":
                square.style.width = "1px";
                square.style.height = "1px";

                timeLimit = 2000;
                break;
        }

        startTimer(timeLimit);

        function startTimer(timeLimit) {
            let timeLeft = timeLimit / 1000;
            timerDisplay.textContent = "Час для кліку: " + timeLeft + " секунд";

            timer = setInterval(function() {
                timeLeft -= 0.1;
                timerDisplay.textContent = "Час для кліку: " + timeLeft.toFixed(1) + " секунд";
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    endGame();
                }
            }, 100);
        }

        function resetTimer() {
            clearInterval(timer);
            switch(difficulty) {
                case "easy":
                    startTimer(4000);
                    break;
                case "medium":
                    startTimer(2000);
                    break;
                case "hard":
                    startTimer(1000);
                    break;
                case "imposible":
                    startTimer(2000);
                    break;
                case "noob":
                    startTimer(20000);
                    break;
            }
        }

        function endGame() {
            square.style.display = "none";
            alert("Гра завершена! Ваш рахунок: " + clickCount);
            window.location.reload();
            //resetGame();
        }

        function resetGame() {
            gameContainer.innerHTML = `
                <select id="difficulty-select">
                    <option value="easy">Легкий</option>
                    <option value="medium">Середній</option>
                    <option value="hard">Важкий</option>
                </select>
                <select id="color-select">
                    <option value="red">Червоний</option>
                    <option value="blue">Синій</option>
                    <option value="green">Зелений</option>
                </select>
                <button id="start-button">Почати</button>
            `;
            startButton = document.getElementById("start-button");
            startButton.addEventListener("click", startGame);
        }
        
    }
});
