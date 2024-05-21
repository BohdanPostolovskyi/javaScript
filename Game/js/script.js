const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let sweets;
let bombs;
let score = 0;
let scoreText;
let timerText;
let gameOver = false;
let startTime;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    //this.load.image('ground', 'assets/platform.png');
    this.load.image('sweet1', 'assets/sweet1.png');
    this.load.image('sweet2', 'assets/sweet2.png');
    this.load.image('sweet3', 'assets/sweet3.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/sweet2.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');

    player = this.physics.add.sprite(400, 550, 'dude');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    sweets = this.physics.add.group();
    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    timerText = this.add.text(16, 50, 'Time: 0', { fontSize: '32px', fill: '#000' });

    startTime = this.time.now;

    this.time.addEvent({
        delay: 1000,
        callback: addFallingObject,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(player, sweets, collectSweet, null, this);
    this.physics.add.overlap(player, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    const elapsed = Math.floor((this.time.now - startTime) / 1000);
    timerText.setText('Time: ' + elapsed);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
}

function addFallingObject() {
    const x = Phaser.Math.Between(50, 750);
    const type = Phaser.Math.Between(1, 4);
    let object;

    if (type === 4) {
        object = bombs.create(x, 10, 'bomb');
        object.setVelocityY(200);
    } else {
        object = sweets.create(x, 10, 'sweet' + type);
        object.setVelocityY(200);
    }

    object.setCollideWorldBounds(true);
    object.setBounce(0.8);
    object.setAngularVelocity(Phaser.Math.Between(-100, 100));
}

function collectSweet(player, sweet) {
    sweet.disableBody(true, true);
    score += 1;
    scoreText.setText('Score: ' + score);

    if (score >= 30) {
        gameOver = true;
        this.add.text(300, 300, 'You Win!', { fontSize: '64px', fill: '#000' });
        this.add.text(300, 400, 'Time: ' + timerText.text, { fontSize: '32px', fill: '#000' });
    }
}

function hitBomb(player, bomb) {
    bomb.disableBody(true, true);
    score -= 5;
    scoreText.setText('Score: ' + score);

    if (score < 0) {
        gameOver = true;
        this.add.text(300, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    }
}
