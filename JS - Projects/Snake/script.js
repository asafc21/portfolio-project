const board = document.getElementById("gameboard");
const score = document.getElementById("score");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameStart = false;
let gameSpeedDelay = 200;
let gameInterval;

function draw() {
  board.innerHTML = "";
  createSnake();
  createFood();
  score.innerHTML = snake.length - 1;
}

function createSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const createdElement = document.createElement(tag);
  createdElement.className = className;
  return createdElement;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function createFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

function generateFood() {
  let x = Math.floor(Math.random() * gridSize) + 1;
  let y = Math.floor(Math.random() * gridSize) + 1;
  for (let i = 1; i < snake.length; i++) {
    if (x == snake[i].x && y == snake[i].y) {
      x = Math.floor(Math.random() * gridSize) + 1;
      y = Math.floor(Math.random() * gridSize) + 1;
    }
  }
  return { x, y };
}

draw();

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      moveSnake();
      checkStuck();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStart = true;
  gameInterval = setInterval(() => {
    moveSnake();
    checkStuck();
    draw();
  }, gameSpeedDelay);
}

function handleKeyPress(e) {
  if ((!gameStart && e.code === "Space") || (!gameStart && e.key === "Space")) {
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
    }
  }
}

function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkStuck() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    gameLost();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameLost();
    }
  }
}

function gameLost() {
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  gameStart = false;
  alert("You Lost :( ");
  clearInterval(gameInterval);
}

document.addEventListener("keydown", handleKeyPress);
