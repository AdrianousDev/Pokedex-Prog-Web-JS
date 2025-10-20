import chamarApi from "./chamarApi.js";
import criarCard from "./criarCard.js";

export default function navegacao() {
  eventBottomNavigation();
}

function eventBottomNavigation() {
  const nextButton = document.querySelector("#nextButton");
  const previousButton = document.querySelector("#previousButton");

  if (!previousButton || !nextButton) {
    return;
  }

  let offset = 0;

  // next event
  nextButton.addEventListener("click", async () => {
    offset += 20;
    const dados = await chamarApi(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    criarCard(dados);
  });

  // previous event
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
