import { countries, reset, search } from "./countries.service.js";
import { likedCountries, getData, updateData } from "./localstorage.service.js";

const searchInput = document.getElementById("search");
const cards = document.getElementById("cards");

searchInput.addEventListener("keyup", (e) => {
  reset();
  cards.innerHTML = "";

  if (!e.target.value || e.target.value == "") {
    return createCardsList();
  }

  search(e.target.value);
  createCardsList();
});

const createCard = (country) => {
  const card = document.createElement("div");
  card.className = "card m-2 col-md-3 col-sm-12 shadow";

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top img border rounded shadow my-3";
  cardImg.src = country.flags.png;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.textContent = country.name.common;

  const population = document.createElement("p");
  population.className = "card-text";
  population.textContent = `Population: ${country.population}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center";

  const heart = document.createElement("i");

  heart.addEventListener("click", () => {
    updateData(country.name.common);
    if (heart.classList[heart.classList.length - 1] == "text-dark") {
      heart.className = "fa fa-heart text-danger";
    } else {
      heart.className = "fa fa-heart text-dark";
    }
  });

  let isLiked = false;
  getData();
  if (likedCountries.includes(country.name.common)) {
    isLiked = true;
  }
  heart.className = `fa fa-heart ${isLiked ? "text-danger" : "text-dark"}`;

  card.appendChild(cardImg);

  cardFooter.appendChild(heart);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);

  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cards.append(card);
};

export const createCardsList = async () => {
  try {
    for (let item of await countries) {
      createCard(item);
    }
  } catch (error) {
    console.error(error);
  }
};
