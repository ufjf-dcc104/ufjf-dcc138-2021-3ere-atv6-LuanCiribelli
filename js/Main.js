import AssetManager from "./AssetManager.js";

import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo1.js";
import CenaJogo2 from "./CenaJogo2.js";
import CenaJogo3 from "./CenaJogo3.js";
import CenaJogo4 from "./CenaJogo4.js";
import CenaJogo5 from "./CenaJogo5.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import CenaVitoria from "./CenaVitoria.js";
import CenaJogo6 from "./CenaJogo6.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

const menuInicial = document.getElementById("startScreen");
const instrucoes = document.getElementById("instrucoes");
const creditos = document.getElementById("creditos");

assets.carregaImagem("tiles", "assets/tileset.png");
assets.carregaImagem("pc", "assets/PC.png");
assets.carregaImagem("pc", "assets/PC.png");
assets.carregaImagem("npcResgatar", "assets/Resgatar.png");
assets.carregaImagem("tiro", "assets/tiro2.png");
assets.carregaImagem("tiro2", "assets/tiro.png");
assets.carregaImagem("back1", "assets/backCena1.jpg");
assets.carregaImagem("back2", "assets/backCen4.png");
assets.carregaImagem("orcBase", "assets/OrcsBasicos.png");
assets.carregaImagem("orcXama", "assets/OrcXama.png");
assets.carregaImagem("orcEscudo", "assets/OrcEscudo.png");
assets.carregaImagem("MagiaInimigo", "assets/magiaInimigo.png");
assets.carregaImagem("flames", "assets/flame.png");

assets.carregaAudio("derrota", "assets/lose.wav");
assets.carregaAudio("vitoria", "assets/victory.wav");
assets.carregaAudio("gameOver", "assets/GAMEOVER.wav");

const canvas = document.querySelector("canvas");
canvas.width = 19 * 32;
canvas.height = 12 * 32;

canvas.style.display = "none";

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "PULA",
  " ": "PROXIMA_CENA",
  g: "BATER",
  f: "ATIRAR",
  d: "DASH",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1_1 = new CenaJogo();
const cena1_2 = new CenaJogo2();
const cena1_3 = new CenaJogo3();
const cena1_4 = new CenaJogo4();
const cena1_5 = new CenaJogo5();
const cena1_6 = new CenaJogo6();
const cena2 = new CenaFim();
const cena3 = new CenaVitoria();

game.adicionarCena("carregando", cena0);
game.adicionarCena("fase1", cena1_1);
game.adicionarCena("fase2", cena1_2);
game.adicionarCena("fase3", cena1_3);
game.adicionarCena("fase4", cena1_4);
game.adicionarCena("fase5", cena1_5);
game.adicionarCena("fase6", cena1_6);
game.adicionarCena("fim", cena2);
game.adicionarCena("vitoria", cena3);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Enter":
      menuInicial.style.display = "none";
      canvas.style.display = "block";
      instrucoes.style.display = "none";
      creditos.style.display = "none";
      game.iniciar();
      break;
    case "p":
      if (game.cena.rodando) {
        game.parar();
      } else {
        game.iniciar();
      }
      break;

    case "r":
      game.timer = new Date();
      game.cena.preparar(1);
      break;

      break;
    case "i":
      if (canvas.style.display == "none") {
        menuInicial.style.display = "none";
        instrucoes.style.display = "block";
      }
      break;
    case "c":
      if (canvas.style.display == "none") {
        menuInicial.style.display = "none";
        creditos.style.display = "block";
      }
      break;
    default:
      break;
  }
});
