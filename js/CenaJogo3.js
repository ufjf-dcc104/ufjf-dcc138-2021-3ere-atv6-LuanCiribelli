import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Machadada from "./Machadada.js";
import Lancada from "./Lancada.js";
import OrcSoldado from "./OrcSoldado.js";
import OrcXama from "./OrcXama.js";
import MagiaInimigo from "./MagiaInimigo.js";

import { mapa3 as modeloMapa3 } from "../maps/mapa3.js";

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
    if (comparaClasse(a, b, "espada", "orcXama")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "espada", "orcBase")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "tiro", "orcBase")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "tiro", "orcXama")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "tiro", "tiroXama")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "espada", "tiroXama")) {
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
          this.acaoNoMomentoORC,
          this.orcXamaAcaoNoMomento
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
            break;
          case 5:
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
            this.ctx.drawImage(
              this.assets.img("flames"),
              150,
              195,
              32,
              45,
              64,
              0,
              16,
              16
            );
            break;
          default:
            break;
        }
      });
    }
  }
  checaFim() {
    if (this.pcCenaJogo.x > 591) {
      this.game.selecionaCena("fase4", 1);
    } else if (this.pcCenaJogo.x < 17) {
      this.game.selecionaCena("fase2", 2);
    }
    if (this.sprites.length == 0) {
      this.game.selecionaCena("fim", 0);
    }
  }

  preparar(porta) {
    super.preparar();
    const mapa3 = new Mapa(19, 12, 32);
    mapa3.carregaMapa(modeloMapa3);
    this.configuraMapa(mapa3);
    this.mapa = mapa3;
    this.contaMapa = 1;
    this.contador = 0;
    const acao = null;
    const pc = new PC({ h: 20, w: 8,mana:this.magiaTotal });
    if (porta == 1) {
      pc.x = 32 * 1;
      pc.y = 32 * 10;
    } else {
      pc.x = 32 * 18;
      pc.y = 32 * 10;
    }
    pc.tags.add("pc");

    let orc = new OrcSoldado({ x: 32 * 11, y: 32 * 10.3, h: 40, w: 16 });
    orc.tags.add("orcBase");

    let orcXama = new OrcXama({ x: 32 * 18, y: 32 * 10.3, h: 40, w: 16 });
    orcXama.tags.add("orcXama");

    this.pcCenaJogo = pc;
    this.CoolDown = 0;

    this.dirOrc = "esquerda";
    this.OrcCD = 4;
    this.MagiaOrcCd = 0;
    this.orcXamaAcaoNoMomento;
    const cena = this;

    orc.controlar = function (dt) {
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
              cena.OrcCD = 2;
              this.cena.adicionar(batidaORC);
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
              cena.OrcCD = 2;
              this.cena.adicionar(batidaORC);
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
        this.vx = 20 * Math.sign(pc.x - this.x);
        if (this.vx > 0) {
          cena.acaoNoMomentoORC = "MOVENDO_PARA_DIREITA";
        } else if (this.vx < 0) {
          cena.acaoNoMomentoORC = "MOVENDO_PARA_ESQUERDA";
        }
      }
      cena.OrcCD += -1 * dt;
    };
    orcXama.controlar = function (dt) {
      if (cena.MagiaOrcCd <= 0) {
        cena.orcXamaAcaoNoMomento = "ATIRANDO";

        var tiroXama = new MagiaInimigo({
          x: this.x,
          y: this.y,
          vx: -100,
        });
        tiroXama.tags.add("tiroXama");
        this.cena.adicionar(tiroXama);
        tiroXama.mover(0);

        cena.MagiaOrcCd = 5;
      } else {
        cena.orcXamaAcaoNoMomento = "PARADO_ESQUERDA";
      }
      cena.MagiaOrcCd += -1 * dt;
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
          cena.magiaTotal-=1;
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
    this.adicionar(orcXama);
    this.adicionar(pc);
  }
}
