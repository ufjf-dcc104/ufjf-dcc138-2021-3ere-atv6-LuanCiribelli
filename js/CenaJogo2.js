import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Machadada from "./Machadada.js";
import Lancada from "./Lancada.js";
import OrcSoldado from "./OrcSoldado.js";

import { mapa2 as modeloMapa2 } from "../maps/mapa2.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogo2 extends Cena {
  onColisao(a, b) {
    if (
      (a.tags.has("pc") && b.tags.has("tiro")) ||
      (a.tags.has("pc") && b.tags.has("espada")) ||
      (b.tags.has("pc") && a.tags.has("tiro")) ||
      (b.tags.has("pc") && a.tags.has("espada"))
    ) {
    } else {
      if (
        (a.tags.has("orcBase") && b.tags.has("espadaORC")) ||
        (a.tags.has("espadaORC") && b.tags.has("orcBase"))
      ) {
      } else {
        if (!this.aRemover.includes(a)) {
          this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
          this.aRemover.push(b);
        }

        if (
          (a.tags.has("pc") && b.tags.has("enemy")) ||
          (a.tags.has("pc") && b.tags.has("tiroXama")) ||
          (a.tags.has("pc") && b.tags.has("espadaORC")) ||
          (a.tags.has("pc") && b.tags.has("orcBase")) ||
          (a.tags.has("pc") && b.tags.has("orcXama"))
        ) {
          this.rodando = false;
          this.assets.play("derrota");
          this.game.selecionaCena("fim");
        } else {
          // this.assets.play("colisaoInimigos");
        }
      }
    }
  }

  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(
      this.assets.img("back1"),
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.mapa?.draw(this.ctx);
    if (this.assets.acabou()) {
      this.sprites.forEach((sprite) => {
        sprite.draw(
          this.ctx,
          this.dt,
          this.acaoNoMomento,
          this.acaoNoMomentoORC
        );
        if (sprite.aplicaRestricoes()) {
          if (sprite.tags.has("pc")) {
            this.game.selecionaCena("fim", 0);
          } else {
            this.onColisao(sprite, sprite);
          }
        }
      });
    }
  }
  checaFim() {
    if (this.pcCenaJogo.x > 591) {
      this.game.selecionaCena("fase3", 1);
    } else if (this.pcCenaJogo.x < 17) {
      this.game.selecionaCena("fase1", 2);
    }
    if (this.sprites.length == 0) {
      this.game.selecionaCena("fim", 0);
    }
  }
  preparar(porta) {
    super.preparar();
    const mapa2 = new Mapa(19, 12, 32);
    mapa2.carregaMapa(modeloMapa2);
    this.configuraMapa(mapa2);
    this.mapa = mapa2;
    this.contaMapa = 1;
    this.contador = 0;
    const acao = null;
    const pc = new PC({ h: 16, w: 16 });
    if (porta == 1) {
      pc.x = 32 * 1;
      pc.y = 32 * 10;
    } else {
      pc.x = 32 * 18;
      pc.y = 32 * 10;
    }
    pc.tags.add("pc");

    let orc = new OrcSoldado({ x: 32 * 11, y: 32 * 10, h: 32, w: 32 });
    orc.tags.add("orcBase");

    this.pcCenaJogo = pc;
    this.CoolDown = 0;

    this.dirOrc = "direita";
    this.OrcCD = 4;
    const cena = this;

    orc.controlar = function (dt) {
      cena.OrcCD += -1 * dt;

      if (this.x - 64 < cena.pcCenaJogo.x && this.x + 64 > cena.pcCenaJogo.x) {
        this.vx = 20 * Math.sign(cena.pcCenaJogo.x - this.x);
        if (cena.OrcCD <= 0) {
          if (this.x > cena.pcCenaJogo.x) {
            cena.acaoNoMomentoORC = "BATENDO";
            var batidaORC = new Lancada({
              x: this.x - 32,
              y: this.y + 32,
              h: 10,
              w: 32,
              color: "rgba(255, 0, 0, 1)",
            });
            batidaORC.tags.add("espadaORC");
          } else {
            cena.acaoNoMomentoORC = "BATENDO";
            var batidaORC = new Lancada({
              x: this.x + 32,
              y: this.y + 32,
              h: 10,
              w: 32,
              color: "rgba(255, 0, 0, 1)",
            });
            batidaORC.tags.add("espadaORC");
          }
          cena.OrcCD = 2;
          this.cena.adicionar(batidaORC);
        }
      } else {
        if (this.x >= 16 * 32) {
          cena.dirOrc = "esquerda";
        }
        if (this.x <= 10 * 32) {
          cena.dirOrc = "direita";
        }
        if (cena.dirOrc == "direita") {
          this.vx = +30;
          cena.acaoNoMomentoORC = "MOVENDO_PARA_DIREITA";
        } else if (cena.dirOrc == "esquerda") {
          this.vx = -30;
          cena.acaoNoMomentoORC = "MOVENDO_PARA_ESQUERDA";
        }
      }
    };

    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
        cena.acaoNoMomento = "MOVENDO_PARA_ESQUERDA";
      }
      if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
        cena.acaoNoMomento = "MOVENDO_PARA_DIREITA";
      }
      if (cena.input.comandos.get("DASH")) {
        if (cena.CoolDown <= 0) {
          if (this.vx > 0) {
            this.vx = +500;
            cena.acaoNoMomento = "MOVENDO_PARA_DIREITA";
            cena.CoolDown = 0.4;
          } else if (this.vx < 0) {
            this.vx = -500;
            cena.acaoNoMomento = "MOVENDO_PARA_ESQUERDA";
            cena.CoolDown = 0.4;
          }
        }
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
        if (cena.CoolDown <= 0 && this.mana > 0) {
          cena.acaoNoMomento = "ATIRANDO";
          if (this.vx < 0) {
            var tiro = new Magia({
              x: this.x - 50,
              y: this.y - 10,
              vx: -100,
              lado: "Esquerda",
            });
          } else {
            var tiro = new Magia({
              x: this.x + 50,
              y: this.y - 10,
              vx: +100,
              lado: "Direita",
            });
          }
          tiro.tags.add("tiro");
          this.cena.adicionar(tiro);
          tiro.mover(0);
          cena.CoolDown = 0.4;
          this.mana -= 1;
        }
      }
      if (cena.input.comandos.get("BATER")) {
        if (cena.CoolDown <= 0) {
          cena.acaoNoMomento = "BATENDO";
          if (this.vx < 0) {
            var batida = new Machadada({
              x: this.x - 32,
              y: this.y,
              color: "rgba(255, 0, 0, 0)",
            });
            batida.tags.add("espada");
          } else {
            var batida = new Machadada({
              x: this.x + 32,
              y: this.y,
              color: "rgba(255, 0, 0, 0)",
            });
            batida.tags.add("espada");
          }
          cena.CoolDown = 0.4;
          this.cena.adicionar(batida);
        }
      }
    };
    this.adicionar(orc);
    this.adicionar(pc);
  }
}
