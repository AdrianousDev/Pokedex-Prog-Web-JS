import chamarApi from "./modules/chamarApi.js";
let searchPokemon = 1;

async function construirPokemon(numero) {
  const urlPokeApi = `https://pokeapi.co/api/v2/pokemon/${numero}`;
  const pokemon = await chamarApi(urlPokeApi);

  const pokemonId = document.querySelector("#pokemonId");
  const pokemonName = document.querySelector("#pokemonName");
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");
  const pokemonImage = document.querySelector("#pokemonImage");
  const pokemonTypes = document.querySelector("#pokemonTypes");

  pokemonId.textContent = "";
  pokemonId.textContent = "#" + pokemon.id;

  pokemonName.textContent = "";
  pokemonName.textContent = pokemon.name;

  pokemonHeight.textContent = "";
  pokemonHeight.textContent = pokemon.height;

  pokemonWeight.textContent = "";
  pokemonWeight.textContent = pokemon.weight;

  pokemonTypes.innerHTML = "";
  pokemon.types.forEach((tipo) => {
    const div = document.createElement("div");
    div.textContent = tipo.type.name;
    pokemonTypes.appendChild(div);
  });

  pokemonImage.src = pokemon.sprites.front_default;
  // pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
  //   "front_default"
  // ];
  console.log(pokemon);

  const pokemonDescription = document.querySelector("#pokemonDescription");
  const description = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon-species/${searchPokemon}/`
  );

  const findLanguage = description.flavor_text_entries.find(
    (lang) => lang.language.name === "en"
  );
  pokemonDescription.textContent = findLanguage.flavor_text;

  const pokemonBaseExp = document.querySelector("#pokemonBaseExp");
  pokemonBaseExp.textContent = "";
  pokemonBaseExp.textContent = pokemon.base_experience;
}
construirPokemon(searchPokemon);

const buttonPrev = document.querySelector("#previousButton");
const buttonNext = document.querySelector("#nextButton");

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    construirPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon++;
  construirPokemon(searchPokemon);
});
