import AssetManager from "./AssetManager.js";

import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import CenaVitoria from "./CenaVitoria.js";
import CenaJogoModoInsano from "./CenaJogoModoInsano.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);
const instrucoes = document.getElementById("instruction-container");

assets.carregaImagem("chao", "assets/grass.png");
assets.carregaImagem("paredes", "assets/barrel.png");

assets.carregaImagem("skelly", "assets/skelly.png");

assets.carregaAudio("colisaoInimigos", "assets/jump.wav");
assets.carregaAudio("boom", "assets/boom.wav");
assets.carregaAudio("derrota", "assets/lose.wav");
assets.carregaAudio("vitoria", "assets/victory.wav");
assets.carregaAudio("gameOver", "assets/GAMEOVER.wav");

const canvas = document.querySelector("canvas");
canvas.width = 19 * 32;
canvas.height = 12 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
  i: "MODO_INSANO",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();
const cena3 = new CenaVitoria();
const insaneMode = new CenaJogoModoInsano();

game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fim", cena2);
game.adicionarCena("vitoria", cena3);
game.adicionarCena("modoInsano", insaneMode);

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "p":
      if (game.cena.rodando) {
        game.parar();
      } else {
        game.iniciar();
      }
      break;

    case "r":
      game.timer = new Date();
      game.cena.preparar();
      break;
    case "h":
      if (instrucoes.style.visibility == "hidden") {
        instrucoes.style.visibility = "visible";
      } else {
        instrucoes.style.visibility = "hidden";
      }

      break;
    default:
      break;
  }
});
