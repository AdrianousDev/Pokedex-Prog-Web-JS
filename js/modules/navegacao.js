import chamarApi from "./chamarApi.js";
import criarCard from "./criarCard.js";
import cardPrincipal from "./cardPrincipal.js";

export default function navegacao() {
  eventBottomNavigation();

  eventLateralNavigation();
}

function eventBottomNavigation() {
  const nextButton = document.querySelector("#nextButton");
  const previousButton = document.querySelector("#previousButton");

  let offset = 0;

  if (!previousButton || !nextButton) {
    return;
  }

  // next event
  nextButton.addEventListener("click", async () => {
    offset += 20;
    previousButton.disabled = false;

    const dados = await chamarApi(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    criarCard(dados);
    gerenciarEstadoButton();
  });

  // previous event
  previousButton.disabled = true;
  previousButton.addEventListener("click", async () => {
    if (offset >= 20) {
      offset -= 20;
      const dados = await chamarApi(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      criarCard(dados);
    }
    gerenciarEstadoButton();
  });

  function gerenciarEstadoButton() {
    if (offset < 20) {
      previousButton.disabled = true;
    }
  }
}

function eventLateralNavigation() {
  const divNextLateral = document.querySelector("#divNextLateral");
  const divPreviousLateral = document.querySelector("#divPreviousLateral");

  if (!divNextLateral || !divPreviousLateral) {
    return;
  }

  // previous pokemon event
  divPreviousLateral.addEventListener("click", () => {
    const idPrevious = divPreviousLateral.dataset.id;

    if (idPrevious < 2) {
      return;
    }
    cardPrincipal(idPrevious);
  });

  // next pokemon event
  divNextLateral.addEventListener("click", () => {
    const idNext = divNextLateral.dataset.id;
    console.log(idNext);

    cardPrincipal(idNext);
  });
}
