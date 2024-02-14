const gamePage = document.querySelector('html');
const startButton = document.querySelector('.start-button');
const startTimerText = document.querySelector('.start-timer');
const gameContainer = document.querySelector('.game');
const movingBackground = document.querySelector('.background');
const character = document.querySelector('.character');
const kangaroo = document.querySelector('#kangaroo');
const enemy = document.querySelector('.enemy');
const gameOver = document.createElement('p');

gameOver.innerText = "Game Over!";
gameOver.classList.add('game-over');


const jump = () => {
  if (character.classList != 'animate') {
    character.classList.add('animate');
  }
  setTimeout(function () {
    character.classList.remove('animate');
  }, 400);
};


gamePage.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    jump();
  };
});


const checkCollision = () => setInterval(function () {
  const characterBottom =
    parseInt(
      window.getComputedStyle(character)
        .getPropertyValue("bottom"));
  const enemyPosition =
    parseInt(
      window.getComputedStyle(enemy)
        .getPropertyValue("left"));

  if(enemyPosition <= 100 && enemyPosition > 0 && characterBottom <= -100) {
    enemy.style.animation = 'none';
    kangaroo.src = './images/kangaroo_still.png';
    movingBackground.style.animationPlayState = 'paused';
    gameContainer.append(gameOver);
  };
}, 100);



const gameStart  = () => {
  let count = 4;
  const timer = setInterval(function () {
    count--;
    startTimerText.innerText = count;
    if (count === 0) {
      clearInterval(timer);
      startTimerText.innerText = "Go!";
    };
  }, 1000);

  const removeTimer = setTimeout(function () {
    startTimerText.remove();
  }, 5000);

  const elementsMove = setTimeout(function () {
    movingBackground.classList.add('animate-background');
    kangaroo.src = './images/kangaroo.gif'
  }, 4000);

  const enemyMove = setTimeout(function () {
    enemy.classList.add('animate-enemy');
    movingBackground.classList.add('animate-background');
  }, 4500);

  checkCollision();


};

startButton.addEventListener('click', () => {
  gameStart()
});







