import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";

import { mapa2 as modeloMapa2 } from "../maps/mapa2.js";


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogo2 extends Cena {
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

  checaFim() {
    if (this.pcCenaJogo.x>591) {
      this.game.selecionaCena("fase3");
    }else if( this.pcCenaJogo.x<1){
      this.game.selecionaCena("fase1");
    }    if(this.sprites.length == 0){
      this.game.selecionaCena("gameOver");
    }
  }
  
  preparar() {
    super.preparar();
    const mapa2 = new Mapa(19, 12, 32);
    mapa2.carregaMapa(modeloMapa2);
    this.configuraMapa(mapa2);
    this.mapa = mapa2;
    this.contaMapa = 1;
    this.contador = 0;
    const acao = null;
    const pc = new Sprite({ x: 32 * 1, y: 32 * 10, h: 32, w: 32 });
    pc.tags.add("pc");
    this.pcCenaJogo = pc;
    const cena = this;

    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
        cena.acaoNoMomento = "MOVENDO_PARA_ESQUERDA";
      }
      if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
        cena.acaoNoMomento = "MOVENDO_PARA_DIREITA";
      }
      if (
        cena.input.comandos.get("MOVE_ESQUERDA") ===
        cena.input.comandos.get("MOVE_DIREITA")
      ) {
        this.vx = 0;
        cena.acaoNoMomento = "PARADO";
      }

      if (cena.input.comandos.get("PULA")) {
        if (this.vy == 0) {
          this.vy = -100;
          cena.acaoNoMomento = "PULANDO";
        }
      }
      if (cena.input.comandos.get("ATIRAR")) {
        cena.acaoNoMomento = "ATIRANDO";
        var tiro = new Sprite({
          x: this.x + 50,
          y: this.y,
          vx: Math.sign(this.vx) * 100,
          tags: [tiro],
          controlar: () => {
            this.vx = this.vx * dt;
          },
        });
        this.cena.adicionar(tiro);
      }
      if (cena.input.comandos.get("BATER")) {
        cena.acaoNoMomento = "BATENDO";
        var batida = new Sprite({
          x: this.x,
          y: this.y,
          controlar: () => {
            this.vx = this.vx * dt;
          },
        });
        this.cena.adicionar(batida);
      }
    };

    this.adicionar(pc);
  }
}
