import chamarApi from "./chamarApi.js";
import criarCard from "./criarCard.js";

export default function navegacao() {
  const nextButton = document.querySelector("#nextButton");
  const previousButton = document.querySelector("#previousButton");

  let offset = 0;

  nextButton.addEventListener("click", async () => {
    offset += 20;
    const dados = await chamarApi(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    criarCard(dados);
  });
  previousButton.addEventListener("click", async () => {
    if (offset >= 20) {
      offset -= 20;
      const dados = await chamarApi(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      criarCard(dados);
    }
  });
}
