const board = document.getElementById("game-board");
const playerLives = document.getElementById("player-lives");
const playerScore = document.getElementById("player-score");
const resetButton = document.querySelector(".reset-btn");
const msg = document.querySelector(".msg");
let livesLeft = 6;
playerLives.textContent = livesLeft;
let score = 0;
playerScore.textContent = score;

const getCards = () => [
  { imgSrc: "./images/cherries.png", name: "cherries" },
  { imgSrc: "./images/grapes.png", name: "grapes" },
  { imgSrc: "./images/lemon.png", name: "lemon" },
  { imgSrc: "./images/orange.png", name: "orange" },
  { imgSrc: "./images/pineapple.png", name: "pineapple" },
  { imgSrc: "./images/strawberry.png", name: "strawberry" },
  { imgSrc: "./images/tomato.png", name: "tomato" },
  { imgSrc: "./images/watermelon.png", name: "watermelon" },
  { imgSrc: "./images/cherries.png", name: "cherries" },
  { imgSrc: "./images/grapes.png", name: "grapes" },
  { imgSrc: "./images/lemon.png", name: "lemon" },
  { imgSrc: "./images/orange.png", name: "orange" },
  { imgSrc: "./images/pineapple.png", name: "pineapple" },
  { imgSrc: "./images/strawberry.png", name: "strawberry" },
  { imgSrc: "./images/tomato.png", name: "tomato" },
  { imgSrc: "./images/watermelon.png", name: "watermelon" },
];

const randomizeCards = () => {
  const cardsData = getCards();
  cardsData.sort(() => Math.random() - 0.5);
  return cardsData;
};

const generateCards = () => {
  const cardsData = randomizeCards();
  cardsData.forEach((item) => {
    const card = document.createElement("div");
    const cardFront = document.createElement("img");
    const cardBack = document.createElement("div");
    card.classList = "card";
    cardFront.classList = "card-front";
    cardBack.classList = "card-back";
    cardFront.src = item.imgSrc;
    board.appendChild(card);
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    card.setAttribute("card-name", item.name);
    card.classList.add("toggle");
    setTimeout(() => {
      card.classList.remove("toggle");
    }, 800);
  });
};

function createCardsClickEvent() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.addEventListener("click", (e) => {
      checkIfCardsMatch(e);
      card.classList.add("toggle");
    })
  );
}

generateCards();
createCardsClickEvent();

function checkIfCardsMatch(e) {
  let flippedCard = e.target;
  flippedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("card-name") ===
      flippedCards[1].getAttribute("card-name")
    ) {
      score += 200;
      playerScore.textContent = score;
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        item.style.pointerEvents = "none";
      });
      if (score === 1600) {
        msg.textContent = "You Win :D";
        resetButton.style.display = "block";
      }
    } else {
      livesLeft--;
      playerLives.textContent = livesLeft;
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        setTimeout(() => item.classList.remove("toggle"), 1000);
      });
      checkIfGameLost();
    }
  }
}

function checkIfGameLost() {
  if (livesLeft == 0) {
    board.style.pointerEvents = "none";
    setTimeout(() => {
      msg.textContent = "You lose :(";
      resetButton.style.display = "block";
    }, 1000);
  }
}

function resetGame() {
  score = 0;
  livesLeft = 6;
  playerLives.textContent = livesLeft;
  playerScore.textContent = score;
  board.innerHTML = "";
  board.style.removeProperty("pointer-events");
  generateCards();
  createCardsClickEvent();
  resetButton.style.display = "none";
  msg.textContent = "";
}
