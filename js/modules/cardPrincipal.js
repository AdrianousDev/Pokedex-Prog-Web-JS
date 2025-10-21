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

  updatePokemonTypes(pokemonDados);

  updatePreviousPokemon(id);

  updateNextPokemon(id);

  updatePokemonEvolution(pokemonDados);
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

function updatePokemonTypes(pokemonDados) {
  const pokemonDivTypes = document.querySelector("#pokemonDivTypes");

  if (!pokemonDados) {
    return;
  }

  if (!pokemonDivTypes) {
    return;
  }

  const colorsTypes = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400 text-black",
    ice: "bg-cyan-300 text-black",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-amber-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-stone-500",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300 text-black",
  };

  pokemonDivTypes.innerHTML = "";
  pokemonDados.types.forEach((type) => {
    const span = document.createElement("span");
    const pokemonType = type.type.name;
    span.textContent = pokemonType;
    const colorType = colorsTypes[pokemonType] || "bg-gray-500";
    span.className = `${colorType} text-white font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-white/10`;
    pokemonDivTypes.appendChild(span);
  });
}

async function updatePreviousPokemon(id) {
  const divPreviousLateral = document.querySelector("#divPreviousLateral");
  const previousImg = document.querySelector("#previousImg");
  const previousName = document.querySelector("#previousName");
  const previousId = document.querySelector("#previousId");

  if (!divPreviousLateral || !previousImg || !previousName || !previousId) {
    return;
  }

  if (+id <= 1) {
    previousImg.src = "";
    previousName.textContent = "";
    previousId.textContent = "";
    return;
  }

  const pokemon = await chamarApi(`https://pokeapi.co/api/v2/pokemon-species/${
    +id - 1
  }/
`);

  if (!pokemon) {
    return;
  }

  const idPrevious = pokemon.id;

  divPreviousLateral.dataset.id = idPrevious;

  previousImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPrevious}.png`;

  previousName.textContent = pokemon.name;

  const idFormatado = idPrevious.toString().padStart(4, "0");
  previousId.textContent = `#${idFormatado}`;
}

async function updateNextPokemon(id) {
  const divNextLateral = document.querySelector("#divNextLateral");
  const nextImg = document.querySelector("#nextImg");
  const nextName = document.querySelector("#nextName");
  const nextId = document.querySelector("#nextId");

  if (!divNextLateral || !nextImg || !nextName || !nextId) {
    return;
  }

  const pokemon = await chamarApi(`https://pokeapi.co/api/v2/pokemon-species/${
    +id + 1
  }/
`);

  if (!pokemon) {
    return;
  }

  const idNext = pokemon.id;

  divNextLateral.dataset.id = idNext;

  nextImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idNext}.png`;

  nextName.textContent = pokemon.name;

  const idFormatado = idNext.toString().padStart(4, "0");
  nextId.textContent = `#${idFormatado}`;
}

async function updatePokemonEvolution(pokemonDados) {
  const container = document.querySelector("#pokemonEvolutions");
  if (!container) return;

  // limpa a div antes de preencher
  container.innerHTML = "";

  // busca species e evolution chain
  const speciesData = await chamarApi(pokemonDados.species.url);
  if (!speciesData?.evolution_chain) return;

  const evolutionData = await chamarApi(speciesData.evolution_chain.url);

  // função recursiva para pegar todas as evoluções em ordem
  function extrairEvolucoes(chain, resultado = []) {
    const especie = chain.species.name;
    const detalhes = chain.evolution_details[0];

    let condicao = null;

    if (detalhes) {
      if (detalhes.min_level) condicao = `Lvl ${detalhes.min_level}`;
      else if (detalhes.item) condicao = detalhes.item.name;
      else if (detalhes.trigger)
        condicao = detalhes.trigger.name.replace("-", " ");
    }

    resultado.push({ nome: especie, condicao });

    if (chain.evolves_to.length > 0) {
      extrairEvolucoes(chain.evolves_to[0], resultado);
    }

    return resultado;
  }

  const evolucoes = extrairEvolucoes(evolutionData.chain);

  // para cada evolução, cria imagem + texto
  for (let i = 0; i < evolucoes.length; i++) {
    const evo = evolucoes[i];

    // busca dados do Pokémon para obter o ID e sprite oficial
    const dadosPokemon = await chamarApi(
      `https://pokeapi.co/api/v2/pokemon/${evo.nome}`
    );

    // imagem do pokémon (oficial artwork com fallback)
    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dadosPokemon.id}.png`;
    img.alt = evo.nome;
    img.className = "w-16 h-16 drop-shadow-lg";

    container.appendChild(img);

    // se não for o último, mostra o motivo da evolução
    if (i < evolucoes.length - 1) {
      const motivo = document.createElement("span");
      motivo.textContent = evolucoes[i + 1].condicao || "→";
      motivo.className = "text-sm font-semibold text-white/80 px-2";
      container.appendChild(motivo);
    }
  }
}
