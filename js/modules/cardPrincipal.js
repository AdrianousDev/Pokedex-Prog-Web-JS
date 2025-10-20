import chamarApi from "./chamarApi.js";

export default async function cardPrincipal(id) {
  const pokemonDados = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );

  updatePokemonImage(pokemonDados);

  updatePokemonId(pokemonDados);

  updatePokemonName(pokemonDados);

  updatePokemonDescription(id);

  updatePokemonDimensions(pokemonDados);

  updatePokemonBaseExp(pokemonDados);

  updatePokemonStats(pokemonDados);
}

function updatePokemonImage(pokemonDados) {
  const pokemonImg = document.querySelector("#pokemonImg");

  if (!pokemonImg) {
    return;
  }

  if (!pokemonDados.sprites?.front_default) {
    pokemonImg.src = "./images/not-found.png";
    return;
  }

  pokemonImg.src = pokemonDados.sprites.front_default;
}

function updatePokemonId(pokemonDados) {
  const pokemonId = document.querySelector("#pokemonId");

  const idFormatado = pokemonDados.id.toString().padStart(4, "0");

  pokemonId.textContent = `#${idFormatado}`;
}

function updatePokemonName(pokemonDados) {
  const pokemonName = document.querySelector("#pokemonName");

  if (!pokemonName) {
    return;
  }

  if (!pokemonDados) {
    return;
  }

  pokemonName.textContent = pokemonDados.name;
}

async function updatePokemonDescription(id) {
  // fetch no endpoint que tem os flavors
  const dadosDescription =
    await chamarApi(`https://pokeapi.co/api/v2/pokemon-species/${id}/
`);

  const pokemonDescription = document.querySelector("#pokemonDescription");

  if (!pokemonDescription) {
    return;
  }

  if (!dadosDescription) {
    pokemonDescription.textContent = "Descrição Padrão.";
    return;
  }

  // preocura o flavor que está em "en"
  const enDescription = dadosDescription.flavor_text_entries.find(
    (item) => item.language.name == "en"
  );

  // regex para tirar \n \f \r
  const descriptionTratada = enDescription.flavor_text
    .replace(/[\f\n\r]/g, " ")
    .toLowerCase();

  pokemonDescription.textContent = descriptionTratada;
}

function updatePokemonDimensions(pokemonDados) {
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");

  if (!pokemonHeight || !pokemonWeight) {
    return;
  }

  if (!pokemonDados) {
    return;
  }

  pokemonHeight.textContent = `${pokemonDados.height / 10}m`;
  pokemonWeight.textContent = `${pokemonDados.weight / 10}kg`;
}

function updatePokemonBaseExp(pokemonDados) {
  const pokemonBaseExp = document.querySelector("#pokemonBaseExp");

  if (!pokemonBaseExp) {
    return;
  }

  if (!pokemonDados) {
    return;
  }

  pokemonBaseExp.textContent = pokemonDados.base_experience;
}

function updatePokemonStats(pokemonDados) {
  const pokemonDivStats = document.querySelector("#pokemonDivStats");

  if (!pokemonDados) {
    return;
  }

  if (!pokemonDivStats) {
    return;
  }

  pokemonDivStats.innerHTML = "";
  pokemonDados.stats.forEach((status) => {
    const span = document.createElement("span");
    span.textContent = status.base_stat;
    span.className =
      "bg-white/20 text-white font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-white/10";
    pokemonDivStats.appendChild(span);
  });
}
