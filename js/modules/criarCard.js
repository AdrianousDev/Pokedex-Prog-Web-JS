export default async function criarCard(pokemons) {
  const listaPokemons = document.querySelector("#listaPokemons");

  for (const pokemon of pokemons.results) {
    const id = pokemon.url.split("/")[6];

    const div = document.createElement("div");
    div.className = "py-2 bg-gray-200 rounded-md text-center";

    const img = document.createElement("img");
    img.className = "mx-auto";
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const h3 = document.createElement("h3");
    h3.textContent = pokemon.name;

    const span = document.createElement("span");
    span.textContent = `#${id}`;

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(span);
    listaPokemons.appendChild(div);
  }
}
