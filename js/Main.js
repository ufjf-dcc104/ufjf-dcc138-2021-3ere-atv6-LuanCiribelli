import AssetManager from "./AssetManager.js";

import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import CenaVitoria from "./CenaVitoria.js";


const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("pareds", "assets/mapa.png");
// assets.carregaImagem("orc", " assets/orc.png");
// assets.carregaImagem("skelly", "assets/skelly.png");
assets.carregaAudio("pulo", "assets/jump.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 19 * 32;
canvas.height = 12 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
});

const game = new Game(canvas,assets,input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();
const cena3 = new CenaVitoria();


game.adicionarCena("carregando",cena0);
game.adicionarCena("jogo",cena1);
game.adicionarCena("fim",cena2);
game.adicionarCena("vitoria",cena3);



game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
  
    case "p":
      if(game.cena.rodando){
      game.parar();
      }
      else{
        game.iniciar();
      }
      break;
    case "c":
      assets.play("pulo");
      break;
    case "b":
      assets.play("boom");
      break;
      case "r":
     game.cena.preparar();
      break;
    default:
      break;
  }
});
