const gamePage = document.querySelector('html');
const startButton = document.querySelector('.start-button');
const startTimerText = document.querySelector('.start-timer');
const gameContainer = document.querySelector('.game');
const enemy = document.querySelector('.enemy');
const movingBackground = document.querySelector('.background');
const character = document.querySelector('.character');
const kangaroo = document.querySelector('#kangaroo');
const gameOverTextContainer = document.createElement('p');
gameOverTextContainer.innerText = "Game Over!";
gameOverTextContainer.classList.add('game-over');

const obstacles = [
  { name: 'toad', imgSrc: 'toad.png' },
  { name: 'cactus', imgSrc: 'cactus.png' },
  { name: 'tyre', imgSrc: 'tyre.png' },
  { name: 'scorpion', imgSrc: 'scorpion.png' },
  { name: 'snake', imgSrc: 'snake.png' },
];

let gameOver = false; // Still needed?


let obstacleImg;
let obstacleInterval;
const generateObstacle = () => {
  if (obstacleImg) {
    enemy.removeChild(obstacleImg);
  };
  const selectedObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
  obstacleImg = document.createElement('img');
  obstacleImg.src = `./images/obstacles/${selectedObstacle.imgSrc}`;
  obstacleImg.alt = `A cartoon representation of ${selectedObstacle.name}`;
  enemy.append(obstacleImg);
};

const changeObstacle = () => {
  obstacleInterval = setInterval(generateObstacle, 1500);
  console.log("changeObstacle called");
};

const stopObstacleChange = () => {
  clearInterval(obstacleInterval)
};

const jump = () => {
  if (character.classList != 'animate') {
    character.classList.add('animate');
  }
  setTimeout(function () {
    character.classList.remove('animate');
  }, 400);
};

const runTimers = () => {
  // Runs countdown timer
  let count = 4;
  const countDown = setInterval(function () {
    count--;
    startTimerText.innerText = count;
    if (count === 0) {
      clearInterval(countDown);
      startTimerText.innerText = "Go!";
    };
  }, 1000);
  // Runs animations for background and game character
  const elementsMove = setTimeout(function () {
    movingBackground.classList.add('animate-background');
    kangaroo.src = './images/kangaroo.gif'
  }, 4000);
  // Starts enemy movement
  const enemyMove = setTimeout(function () {
    enemy.classList.add('animate-enemy');
  }, 4500);
  // Removes countdown timer from screen
  const removeTimer = setTimeout(function () {
    startTimerText.remove();
  }, 5000);
  console.log("runTimers called");
};

const checkCollision = () => setInterval(function () {
  const characterBottom =
    parseInt(
      window.getComputedStyle(character)
        .getPropertyValue("bottom"));
  const enemyPosition =
    parseInt(
      window.getComputedStyle(enemy)
        .getPropertyValue("left"));

  if (enemyPosition <= 100 && enemyPosition > 0 && characterBottom <= -100) {
    enemy.style.animation = 'none';
    kangaroo.src = './images/kangaroo_still.png';
    movingBackground.style.animationPlayState = 'paused';
    gameContainer.append(gameOverTextContainer);
    gameOver = true; // Still needed?
    stopObstacleChange();
  };
}, 100);


const gameStart = () => {
  runTimers();
  changeObstacle();
  checkCollision();
  console.log("gameStart called");
  startButton.setAttribute('disabled', '');
};

startButton.addEventListener('click', () => {
  gameStart();
});

gamePage.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    jump();
  };
});







