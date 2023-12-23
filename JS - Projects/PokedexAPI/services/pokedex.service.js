import { Pokemon } from "../classes/pokemon.js";

async function getPoke(num) {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await axios.get(url);
    let { id, name, types, stats, sprites } = res.data;
    let pokeId = id;
    let pokeImg = sprites.front_default;
    let pokeName = name;
    let pokeType = types;
    let pokeHp = stats[0].base_stat;
    let pokeAtk = stats[1].base_stat;
    let pokeDef = stats[2].base_stat;
    let pokeSpAtk = stats[3].base_stat;
    let pokeSpDef = stats[4].base_stat;
    let pokeSpeed = stats[5].base_stat;

    let poke = new Pokemon(
      pokeId,
      pokeImg,
      pokeName,
      pokeType,
      pokeHp,
      pokeAtk,
      pokeDef,
      pokeSpAtk,
      pokeSpDef,
      pokeSpeed
    );

    return poke;
  } catch (error) {
    console.log(error);
  }
}

const pokemonCount = 151;

let pokemonsFull = [];
let pokeArray = [];
let checkIsPokemonsInLocalStorage = () => {
  if (localStorage.getItem("pokemons")) {
    return true;
  } else return false;
};

let check = checkIsPokemonsInLocalStorage();
if (!check) {
  for (let i = 1; i <= pokemonCount; i++) {
    pokemonsFull.push(getPoke(i));
  }
  pokeArray = await Promise.all(pokemonsFull)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  localStorage.setItem("pokemons", JSON.stringify(pokeArray));
} else {
  pokeArray = JSON.parse(localStorage.getItem("pokemons"));
}

function search(text) {
  pokeArray = JSON.parse(localStorage.getItem("pokemons"));
  pokeArray = pokeArray.filter((pokemon) => {
    return pokemon.name.includes(text.toLowerCase());
  });
}

function searchByType(value) {
  pokeArray = pokeArray.filter((pokemon) => {
    let types = pokemon.type;
    for (let type of types) {
      if (type.type.name == value) return type.type.name.includes(value);
    }
  });
}

function reset() {
  pokeArray = JSON.parse(localStorage.getItem("pokemons"));
}

export { pokeArray, reset, search, searchByType };
