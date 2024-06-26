(function (global){

    const vJS = {};
    
    vJS.StartGame = function () {

        const gameHtml = "snippets/game-snippets.html";

        document.querySelector("nav").style.display = 'none';
        document.querySelector("footer").style.display = 'none';
    
        $ajaxifyJS.sendGetRequest(
            gameHtml,
            function (responseText) {
                document.querySelector("#main-page").innerHTML = responseText;

                document.querySelector("#background").style.width = "100%";;
                document.querySelector("#background").style.height = "100%";;
                
                const player = document.getElementById('player');
                let direction = 'right';
                const speed = 20;
                const gameContainer = document.querySelector('.game-container');
                const scoreDisplay = document.getElementById('score');
                const winMessage = document.getElementById('winMessage');
                let gameInterval;
                let gameIntervalBomb;
                
                
                
                document.addEventListener('keydown', function(event) {
                    if (event.code === 'ArrowLeft') {
                        movePlayer('left');
                    } else if (event.code === 'ArrowRight') {
                        movePlayer('right');
                    }
                });
                
                function movePlayer(newDirection) {
                    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
                
                    if (newDirection !== direction) {
                        // Зміна напрямку
                        direction = newDirection;
                        // Зміна відображення в залежності від напрямку
                        player.style.transform = (direction === 'right') ? 'scaleX(-1)' : 'scaleX(1)';
                    }
                
                
                    if (direction === 'right') {
                        if (playerLeft < window.innerWidth - player.width) {
                            player.style.left = playerLeft + speed + 'px';
                        }
                    } else if (direction === 'left') {
                        if (playerLeft > 0) {
                            player.style.left = playerLeft - speed + 'px';
                        }
                    }
                }
                
                
                function checkCollision(cake) {
                    const cakeRect = cake.getBoundingClientRect();
                    const playerRect = player.getBoundingClientRect();
                    return !(cakeRect.right < playerRect.left || cakeRect.left > playerRect.right || cakeRect.bottom < playerRect.top || cakeRect.top > playerRect.bottom);
                }
                
                
                let score = 0;
                let scoreText = document.getElementById('score');
                
                const cakeImages = [
                'images/game/sweet1.png', 
                'images/game/sweet2.png', 
                'images/game/sweet3.png'
                ];
                const bombImage = 'images/game/bomb.png';
                
                function createGameElement(type, src) {
                    const element = document.createElement('img');
                    element.src = src;
                    element.classList.add(type);
                    element.style.left = Math.random() * (window.innerWidth - 200) + 100 + 'px';
                    element.style.top = '-50px';
                    gameContainer.appendChild(element);
                    animateElement(element);
                }
                
                function animateElement(element) {
                    function moveElement() {
                        const top = parseInt(window.getComputedStyle(element).getPropertyValue('top'));
                        element.style.top = top + 5 + 'px';
                
                        if (top >= window.innerHeight) {
                            element.remove();
                        } else if (checkCollision(element)) {
                            if (element.classList.contains('cake')) {
                                score++;
                            } else if (element.classList.contains('bomb')) {
                                score -= 5;
                            }
                            scoreText.textContent = "Score: " + score;
                            element.remove();
                            if (score === 10) {
                                stopGame();
                                showWinMessage();
                            }
                            if (score < 0) {
                                scoreText.textContent = "Score: 0";
                                document.getElementById("win-message").textContent = "Ви програли!";
                                stopGame();
                                showWinMessage();
                            }
                        } else {
                            requestAnimationFrame(moveElement);
                        }
                    }
                
                    requestAnimationFrame(moveElement);
                }
                
                function createCake() {
                    const randomImage = cakeImages[Math.floor(Math.random() * cakeImages.length)];
                    createGameElement('cake', randomImage);
                }
                
                function createBomb() {
                    createGameElement('bomb', bombImage);
                }
                
                function startGame() {
                    clearInterval(gameInterval);
                    clearInterval(gameIntervalBomb); 
                    gameInterval = setInterval(createCake, 1000); 
                    gameIntervalBomb = setInterval(createBomb, 1800);
                }
                
                function stopGame() {
                    clearInterval(gameInterval);
                    clearInterval(gameIntervalBomb);
                    const cakes = document.querySelectorAll('.cake, .bomb');
                    cakes.forEach(cake => cake.remove());
                }
                
                function showWinMessage() {
                    winMessage.style.display = 'block';
                }
                    
                startGame();
            },
            false
        );  
    }

    global.$vJS = vJS;

})(window)


