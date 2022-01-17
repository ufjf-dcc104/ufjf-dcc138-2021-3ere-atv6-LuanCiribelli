import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogo extends Cena {
  onColisao(a, b) {
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
    
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.rodando = false;
      this.assets.play("derrota");
      this.game.selecionaCena("fim");
    }else{

    this.assets.play("colisaoInimigos");
  }}

  checaFim() {
    if (this.sprites.length == 1 && this.sprites[0].tags.has("pc")) {
      this.rodando = false;
      this.game.selecionaCena("vitoria");
    }
  }

  criaInimigo() {
    let quadrante = getRandomIntInclusive(1, 4);

    let randX;
    let randy;
    switch (quadrante) {
      case 1:
        randX = getRandomIntInclusive(3, 6);
        randy = getRandomIntInclusive(3, 5);
        break;
      case 2:
        randX = getRandomIntInclusive(12, 16);
        randy = getRandomIntInclusive(3, 5);
        break;
      case 3:
        randX = getRandomIntInclusive(3, 6);
        randy = getRandomIntInclusive(7, 10);
        break;
      case 4:
        randX = getRandomIntInclusive(12, 16);
        randy = getRandomIntInclusive(8, 10);
        break;
    }

    let socorro = true;

    while (socorro) {
      if (this.mapa.retornaPosicao(randX, randy) != 1) {
        socorro = false;
        break;
      }

      randX = getRandomIntInclusive(4, 6);
      randy = getRandomIntInclusive(5, 10);
    }

    const cena = this;

    function perseguePC2() {
      this.vx = 20 * Math.sign(this.cena.pcCenaJogo.x - this.x);
      this.vy = 20 * Math.sign(this.cena.pcCenaJogo.y - this.y);
    }

    this.adicionar(
      new Sprite({
        x: randX * 32,
        y: randy * 32,
        vx: 0,
        vy: 0,
        color: "red",
        controlar: perseguePC2,
        tags: ["enemy"],
      })
    );
  }

  preparar() {
    super.preparar();
    const mapa1 = new Mapa(19, 12, 32);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);
    this.mapa = mapa1;

    this.contador = 0;

    const pc = new Sprite({ x: 32 * 2, y: 32 * 2 });
    pc.tags.add("pc");
    this.pcCenaJogo = pc;
    const cena = this;

    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
      }
      if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
      }
      if (cena.input.comandos.get("MOVE_CIMA")) {
        this.vy = -50;
      }
      if (cena.input.comandos.get("MOVE_BAIXO")) {
        this.vy = +50;
      }
    };

    this.adicionar(pc);

    function perseguePC(dt) {
      this.vx = 20 * Math.sign(pc.x - this.x);
      this.vy = 20 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({
      x: 32 * 10,
      y: 32 * 2,
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    });
    this.adicionar(en1);
  }
}
