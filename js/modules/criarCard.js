import cardPrincipal from "./cardPrincipal.js";

export default async function criarCard(pokemons) {
  const listaPokemons = document.querySelector("#listaPokemons");
  listaPokemons.innerHTML = "";

  for (const pokemon of pokemons.results) {
    const id = pokemon.url.split("/")[6];

    const div = document.createElement("div");
    div.className =
      "bg-gradient-to-b from-red-500 to-red-700 text-white rounded-2xl text-center p-4 shadow-lg shadow-red-900/40 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]";

    const img = document.createElement("img");
    img.className = "mx-auto w-24 h-24 drop-shadow-xl";
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const h3 = document.createElement("h3");
    h3.className = "capitalize font-bold mt-2 text-lg tracking-wide";
    h3.textContent = pokemon.name;

    const span = document.createElement("span");
    span.className = "text-sm opacity-80";
    span.textContent = `#${id}`;

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(span);
    listaPokemons.appendChild(div);

    div.addEventListener("click", () => {
      cardPrincipal(id);
    });
  }
}
