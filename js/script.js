import chamarApi from "./modules/chamarApi.js";
import criarCard from "./modules/criarCard.js";
import navegacao from "./modules/navegacao.js";
import cardPrincipal from "./modules/cardPrincipal.js";

const dados = await chamarApi(
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
);
criarCard(dados);

cardPrincipal(1);

navegacao();
