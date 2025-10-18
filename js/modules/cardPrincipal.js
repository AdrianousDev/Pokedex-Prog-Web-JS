import chamarApi from "./chamarApi.js";

export default async function cardPrincipal(id) {
  const pokemonDados = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );

  // referencias elementos
  const pokemonImg = document.querySelector("#pokemonImg");
  const pokemonId = document.querySelector("#pokemonId");
  const pokemonDescription = document.querySelector("#pokemonDescription");
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");
  const pokemonBaseExp = document.querySelector("#pokemonBaseExp");
  const pokemonDivStats = document.querySelector("#pokemonDivStats");

  pokemonImg.src = pokemonDados.sprites.front_default;
  pokemonId.textContent = `#${pokemonDados.id}`;

  // fetch no endpoint que tem os flavors
  const dadosDescription =
    await chamarApi(`https://pokeapi.co/api/v2/pokemon-species/${id}/
`);

  // preocura o flavor que está em "en"
  const enDescription = dadosDescription.flavor_text_entries.find(
    (item) => item.language.name == "en"
  );
  pokemonDescription.textContent = enDescription.flavor_text;

  pokemonHeight.textContent = `${pokemonDados.height / 10}m`;
  pokemonWeight.textContent = `${pokemonDados.weight / 10}kg`;
  pokemonBaseExp.textContent = pokemonDados.base_experience;

  pokemonDivStats.innerHTML = "";
  pokemonDados.stats.forEach((status) => {
    const span = document.createElement("span");
    span.textContent = status.base_stat;
    span.className =
      "bg-white/20 text-white font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-white/10";
    pokemonDivStats.appendChild(span);
  });
}
