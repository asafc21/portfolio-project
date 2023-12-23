const board = document.getElementById("board");
const boardHeight = 500;
const boardWidth = 500;
const ctx = board.getContext("2d");
const paddleHeight = 50;
const paddleWidth = 10;
const paddleVelocityY = 0;
const ballWidth = 10;
const ballHeight = 10;

let player1Score = 0;
let player2Score = 0;

let random = randNum();

const ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velovityX: random * 2.5,
  velovityY: random * 2,
};

const player1 = {
  x: 10,
  y: boardHeight / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  velocityY: paddleVelocityY,
};

const player2 = {
  x: boardWidth - paddleWidth - 10,
  y: boardHeight / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  velocityY: paddleVelocityY,
};

window.onload = function () {
  board.height = boardHeight;
  board.width = boardWidth;
  ctx.fillStyle = "#093661";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);
};

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, board.width, board.height);

  ctx.fillStyle = "#093661";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

  let newPlayer1Y = player1.y + player1.velocityY;
  if (!paddleOutOfBounds(newPlayer1Y)) {
    player1.y = newPlayer1Y;
  }
  player1.velocityY = 0;

  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
  let newPlayer2Y = player2.y + player2.velocityY;
  if (!paddleOutOfBounds(newPlayer2Y)) {
    player2.y = newPlayer2Y;
  }
  player2.velocityY = 0;

  ctx.fillStyle = "#fff";
  ball.x += ball.velovityX;
  ball.y += ball.velovityY;
  ctx.fillRect(ball.x, ball.y, ball.width, ballHeight);

  if (ball.y < 0 || ball.y + ballHeight >= boardHeight) {
    ball.velovityY *= -1;
  }

  if (checkCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velovityX *= -1;
      ball.x = player1.x + player1.width;
    }
  } else if (checkCollision(ball, player2)) {
    if (ball.x + ballWidth >= player2.x) {
      ball.velovityX *= -1;
      ball.x = player2.x - ballWidth;
    }
  }

  ctx.font = "50px Silkscreen";
  ctx.fillText(player1Score, boardWidth / 5, 50);
  ctx.fillText(player2Score, (boardWidth * 4) / 5 - 50, 50);

  if (ball.x < 0) {
    player2Score += 1;
    resetGame();
  } else if (ball.x + ballWidth > boardWidth) {
    player1Score += 1;
    resetGame();
  }

  for (let i = 10; i < board.height; i += 25) {
    ctx.fillStyle = "#093661";
    ctx.fillRect(board.width / 2 - 10, i, 5, 5);
  }
}

function paddleOutOfBounds(yPosition) {
  return yPosition < 0 || yPosition + paddleHeight > boardHeight;
}

function movePlayer(e) {
  if (e.code === "KeyW") {
    player1.velocityY = -25;
  } else if (e.code === "KeyS") {
    player1.velocityY = 25;
  }
  if (e.code === "ArrowUp") {
    player2.velocityY = -25;
  } else if (e.code === "ArrowDown") {
    player2.velocityY = 25;
  }
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function resetGame() {
  (ball.x = boardWidth / 2), (ball.y = boardHeight / 2);
  random = randNum();
  ball.velovityX = random * 2.5;
  ball.velovityY = random * 2;
}

function randNum() {
  let randNum = Math.random();
  let num = randNum < 0.5 ? -1 : 1;
  return num;
}
