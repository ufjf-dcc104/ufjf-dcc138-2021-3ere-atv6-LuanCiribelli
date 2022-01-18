import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import { mapa2 as modeloMapa2 } from "../maps/mapa2.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogoModoInsano extends Cena {
  
  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mapa?.draw(this.ctx);

    if (this.assets.acabou()) {
      this.sprites.forEach((sprite) => {
        sprite.draw(this.ctx);
        sprite.aplicaRestricoes();
      });
    }

    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Level : ${this.dificuldade}`, 20, 20);

    this.ctx.fillStyle = "orange";
    let end = new Date();
    let timeDiff = end - this.game.timer;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    this.ctx.fillText(`Segundos vivo:  ${seconds}`, 32*17, 20);

  }
  
  
  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.passo(this.dt);
    this.draw();
    this.checaColisao();
    this.removerSprites();
    this.checaSubiuLevel();

    if (this.rodando) {
      this.iniciar();
    }

    this.t0 = t;
  }

  passo(dt) {
    if (this.assets.acabou())
      this.sprites.forEach((sprite) => {
        sprite.passo(dt);
      });
  }

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
    } else {
      this.assets.play("colisaoInimigos");
    }
  }

  checaSubiuLevel() {
    if (this.sprites.length == 1 && this.sprites[0].tags.has("pc")) {
      this.dificuldade += 1;
      for (let z = 0; z < this.dificuldade; z++) {
       this.criaInimigo();
      }
    }
  }

  criaInimigo() {
    let randX;
    let randy;

    randX = getRandomIntInclusive(12, 16);
    randy = getRandomIntInclusive(8, 10);

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
      this.vx =
        20 * this.dificuldade * Math.sign(this.cena.pcCenaJogo.x - this.x);
      this.vy =
        20 * this.dificuldade * Math.sign(this.cena.pcCenaJogo.y - this.y);
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
    this.dificuldade = 1;
    super.preparar();
    const mapa2 = new Mapa(19, 12, 32);
    mapa2.carregaMapa(modeloMapa2);
    this.configuraMapa(mapa2);
    this.mapa = mapa2;

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
      x: 32 * 14,
      y: 32 * 2,
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    });
    this.adicionar(en1);

    const en2 = new Sprite({
      x: 32 * 14,
      y: 32 * 10,
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    });
    this.adicionar(en2);
  }
}
