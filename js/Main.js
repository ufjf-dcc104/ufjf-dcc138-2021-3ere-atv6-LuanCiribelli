import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/girl.png");
assets.carregaImagem("orc", " assets/orc.png");
assets.carregaImagem("skelly", "assets/skelly.png");
assets.carregaAudio("pulo", "assets/jump.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
});

const game = new Game(canvas,assets,input);

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);


game.adicionarCena("carregando",cena0);
game.adicionarCena("jogo",cena1);


const mapa1 = new Mapa(10, 14, 32);

mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({ x: 50, y: 90 });
pc.controlar = function (dt) {
  if (input.comandos.get("MOVE_ESQUERDA")) {
    this.vx = -50;
  }
  if (input.comandos.get("MOVE_DIREITA")) {
    this.vx = +50;
  }
  if (input.comandos.get("MOVE_CIMA")) {
    this.vy = -50;
  }
  if (input.comandos.get("MOVE_BAIXO")) {
    this.vy = +50;
  }
};

cena1.adicionar(pc);

function perseguePC(dt) {
  this.vx = 15 * Math.sign(pc.x - this.x);
  this.vy = 15 * Math.sign(pc.y - this.y);
}

const en1 = new Sprite({ x: 360, color: "red", controlar: perseguePC });
cena1.adicionar(en1);
cena1.adicionar(
  new Sprite({ x: 115, y: 70, vy: 10, color: "red", controlar: perseguePC })
);
cena1.adicionar(
  new Sprite({ x: 115, y: 160, vy: -10, color: "red", controlar: perseguePC })
);

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "p":
      game.parar();
      break;
    case "c":
      assets.play("pulo");
      break;
    case "b":
      assets.play("boom");
      break;
    default:
      break;
  }
});
