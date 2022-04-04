import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Machadada from "./Machadada.js";
import Lancada from "./Lancada.js";
import OrcSoldado from "./OrcSoldado.js";

import { mapa2 as modeloMapa2 } from "../maps/mapa2.js";

function comparaClasse(a, b, ca, cb) {
  return (
    (a.tags.has(ca) && b.tags.has(cb)) || (a.tags.has(cb) && b.tags.has(ca))
  );
}

function marcaParaRemover(a, aRemover) {
  if (!aRemover.includes(a)) {
    aRemover.push(a);
  }
}
export default class CenaJogo2 extends Cena {
  onColisao(a, b) {
    if (comparaClasse(a, b, "espada", "orcBase")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "tiro", "orcBase")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (
      comparaClasse(a, b, "pc", "enemy") ||
      comparaClasse(a, b, "pc", "tiroXama") ||
      comparaClasse(a, b, "pc", "espadaORC") ||
      comparaClasse(a, b, "pc", "orcBase") ||
      comparaClasse(a, b, "pc", "orcXama")
    ) {
      this.rodando = false;
      this.assets.play("derrota");
      this.game.selecionaCena("fim");
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
            marcaParaRemover(sprite, this.aRemover);
          }
        }
        switch (this.pcCenaJogo?.mana) {
          case 1:
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              0,
              0,
              16,
              16
            );
            break;
          case 2:
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              0,
              0,
              16,
              16
            );

            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              16,
              0,
              16,
              16
            );
            break;
          case 3:
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              0,
              0,
              16,
              16
            );

            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              16,
              0,
              16,
              16
            );
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              32,
              0,
              16,
              16
            );
            break;
          case 4:
          case 3:
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              0,
              0,
              16,
              16
            );

            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              16,
              0,
              16,
              16
            );
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              32,
              0,
              16,
              16
            );
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              48,
              0,
              16,
              16
            );
          default:
            break;
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
    const pc = new PC({ h: 20, w: 8 });
    if (porta == 1) {
      pc.x = 32 * 1;
      pc.y = 32 * 10;
    } else {
      pc.x = 32 * 18;
      pc.y = 32 * 10;
    }
    pc.tags.add("pc");

    let orc = new OrcSoldado({ x: 32 * 15, y: 32 * 10.3, h: 40, w: 16 });
    orc.tags.add("orcBase");

    this.pcCenaJogo = pc;
    this.CoolDown = 0;

    this.dirOrc = "direita";
    this.OrcCD = 2;
    const cena = this;

    orc.controlar = function (dt) {
      cena.OrcCD += -1 * dt;

      if (this.x - 64 < cena.pcCenaJogo.x && this.x + 64 > cena.pcCenaJogo.x) {
        if (cena.OrcCD <= 0) {
          if (this.x > cena.pcCenaJogo.x) {
            cena.acaoNoMomentoORC = "BATENDO";

            if (Math.round(this.quadroORC) == 5) {
              var batidaORC = new Lancada({
                x: this.x - 20,
                y: this.y,
                h: 10,
                w: 32,
                color: "rgba(255, 0, 0, 0)",
              });
              batidaORC.tags.add("espadaORC");
              this.cena.adicionar(batidaORC);
              cena.OrcCD = 2;
            }
          } else {
            cena.acaoNoMomentoORC = "BATENDO";
            if (Math.round(this.quadroORC) == 5) {
              var batidaORC = new Lancada({
                x: this.x + 20,
                y: this.y,
                h: 10,
                w: 32,
                color: "rgba(255, 0, 0, 0)",
              });
              batidaORC.tags.add("espadaORC");
              this.cena.adicionar(batidaORC);
              cena.OrcCD = 2;
            }
          }
        } else {
          this.vx = 20 * Math.sign(pc.x - this.x);
          if (this.vx > 0) {
            cena.acaoNoMomentoORC = "MOVENDO_PARA_DIREITA";
          } else if (this.vx < 0) {
            cena.acaoNoMomentoORC = "MOVENDO_PARA_ESQUERDA";
          }
        }
      } else {
        if (this.x >= 18 * 32) {
          cena.dirOrc = "esquerda";
        }
        if (this.x <= 14 * 32) {
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
              x: this.x,
              y: this.y,
              vx: -100,
              lado: "Esquerda",
            });
          } else {
            var tiro = new Magia({
              x: this.x,
              y: this.y,
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
