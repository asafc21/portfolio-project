const newGameBtn = document.getElementById("new-game-btn");
const cells = document.querySelectorAll("td");
const result = document.getElementById("result");
let gameStatus = true;
let pTurn = 0;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];

cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    if (gameStatus && cell.innerHTML == "") {
      if (pTurn % 2 === 0) {
        cell.innerHTML = `<i class="xSymbol fa solid fa-x"></i>`;
        pTurn += 1;
        options[cell.getAttribute("cellIndex")] = "X";
      } else {
        cell.innerHTML = `<i class="oSymbol fa solid fa-o"></i>`;
        pTurn += 1;
        options[cell.getAttribute("cellIndex")] = "O";
      }
      if (pTurn === 9) {
        displayResult("It's a Draw", "draw");
        gameStatus = false;
      }
      gameStatus = checkWin();
    }
    if (!gameStatus) {
      const winner = pTurn % 2 === 1 ? "Player 1" : "Player 2";
      displayResult(`${winner} Wins!`, pTurn % 2 === 1 ? "p1-wins" : "p2-wins");
    }
  })
);

function displayResult(msg, className) {
  newGameBtn.style.display = "block";
  result.style.display = "block";
  result.textContent = msg;
  result.className = className;
}

function resetGame() {
  cells.forEach((cell) => (cell.innerHTML = ""));
  pTurn = 0;
  newGameBtn.style.display = "none";
  result.style.display = "none";
  gameStatus = true;
  options = ["", "", "", "", "", "", "", "", ""];
}

function checkWin() {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      return false;
    }
  }
  return true;
}
