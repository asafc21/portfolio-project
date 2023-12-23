import {
  pokeArray,
  reset,
  search,
  searchByType,
} from "./services/pokedex.service.js";

function createPokeTable() {
  for (const pokemon of pokeArray) {
    let typesHTML = "";
    for (let i = 0; i < pokemon.type.length; i++) {
      typesHTML += `<div class=${pokemon.type[i].type.name}>${pokemon.type[
        i
      ].type.name.toUpperCase()}</div>`;
    }

    document.getElementById(
      "tableBody"
    ).innerHTML += `<tr><td>${pokemon.id} <img src="${pokemon.img}" alt="pokemon img"> </td>
    <td class=align-middle>${pokemon.name}</td>
    <td class=align-middle>${typesHTML}</td>
    <td class="align-middle stats">${pokemon.hp}</td>
    <td class="align-middle stats">${pokemon.atk}</td>
    <td class="align-middle stats">${pokemon.def}</td>
    <td class="align-middle stats">${pokemon.spAtk}</td>
    <td class="align-middle stats">${pokemon.spDef}</td>
    <td class="align-middle stats">${pokemon.speed}</td>
    </tr>`;
  }
}
createPokeTable();
document.getElementById("search").addEventListener("keyup", (e) => {
  reset();
  document.getElementById("tableBody").innerHTML = "";
  if (!e.target.value || e.target.value == "") {
    return createPokeTable();
  }
  search(e.target.value);
  createPokeTable();
});

document.getElementById("searchType").addEventListener("change", (e) => {
  reset();
  document.getElementById("tableBody").innerHTML = "";
  if (e.target.value == "Type:") {
    return createPokeTable();
  }
  searchByType(e.target.value);
  createPokeTable();
});
