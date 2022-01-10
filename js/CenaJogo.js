import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

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
      this.game.selecionaCena("fim");
    }
  }

  preparar() {
    super.preparar();
    const mapa1 = new Mapa(10, 14, 32);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);
    
    const pc = new Sprite({ x: 50, y: 90 });
    pc.tags.add("pc");
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
      this.vx = 5 * Math.sign(pc.x - this.x);
      this.vy = 5 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({
      x: 360,
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    });
    this.adicionar(en1);
    this.adicionar(
      new Sprite({
        x: 115,
        y: 70,
        vy: 10,
        color: "red",
        controlar: perseguePC,
        tags: ["enemy"],
      })
    );
    this.adicionar(
      new Sprite({
        x: 115,
        y: 160,
        vy: -10,
        color: "red",
        controlar: perseguePC,
        tags: ["enemy"],
      })
    );
  }
}
