import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Machadada from "./Machadada.js";
import Lancada from "./Lancada.js";
import { mapa4 as modeloMapa4 } from "../maps/mapa4.js";
import OrcXama from "./OrcXama.js";

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

export default class CenaJogo4 extends Cena {
  onColisao(a, b) {
    if (comparaClasse(a, b, "pc", "npc")) {
      this.rodando = false;
      this.assets.play("vitoria");
      this.game.selecionaCena("vitoria");
    }
    if (comparaClasse(a, b, "espada", "orcXama")) {
      marcaParaRemover(a, this.aRemover);
      marcaParaRemover(b, this.aRemover);
    }
    if (comparaClasse(a, b, "espada", "orcBase")) {
      if (a.tags.has("orcBase")) {
        if (a.vidas > 0) {
          a.vidas += -1;
          marcaParaRemover(b, this.aRemover);
        } else {
          marcaParaRemover(a, this.aRemover);
          marcaParaRemover(b, this.aRemover);
        }
      } else {
        if (b.tags.has("orcBase")) {
          if (b.vidas > 0) {
            b.vidas += -1;
            marcaParaRemover(a, this.aRemover);
          } else {
            marcaParaRemover(a, this.aRemover);
            marcaParaRemover(b, this.aRemover);
          }
        }
      }
    }
    if (comparaClasse(a, b, "tiro", "orcBase")) {
      if (a.tags.has("orcBase")) {
        if (a.vidas > 0) {
          a.vidas += -1;
          marcaParaRemover(b, this.aRemover);
        } else {
          marcaParaRemover(a, this.aRemover);
          marcaParaRemover(b, this.aRemover);
        }
      } else {
        if (b.tags.has("orcBase")) {
          if (b.vidas > 0) {
            b.vidas += -1;
            marcaParaRemover(a, this.aRemover);
          } else {
            marcaParaRemover(a, this.aRemover);
            marcaParaRemover(b, this.aRemover);
          }
        }
      }
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
      comparaClasse(a, b, "pc", "orcXama") ||
      comparaClasse(a, b, "npc", "enemy") ||
      comparaClasse(a, b, "npc", "tiroXama") ||
      comparaClasse(a, b, "npc", "espadaORC") ||
      comparaClasse(a, b, "npc", "orcBase") ||
      comparaClasse(a, b, "npc", "orcXama") ||
      comparaClasse(a, b, "npc", "tiro") ||
      comparaClasse(a, b, "npc", "espada")
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
      this.assets.img("back2"),
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
      this.game.selecionaCena("fase5", 1);
    } else if (this.pcCenaJogo.x < 17) {
      this.game.selecionaCena("fase3", 2);
    }
    if (this.sprites.length == 0) {
      this.game.selecionaCena("fim", 0);
    }
  }

  preparar(porta) {
    super.preparar();
    const mapa4 = new Mapa(19, 12, 32);
    mapa4.carregaMapa(modeloMapa4);
    this.configuraMapa(mapa4);
    this.mapa = mapa4;
    this.contaMapa = 1;
    this.contador = 0;
    const acao = null;
    const pc = new PC({ h: 20, w: 8 });
    pc.tags.add("pc");

    if (porta == 1) {
      pc.x = 32 * 1;
      pc.y = 32 * 10;
    } else {
      pc.x = 32 * 18;
      pc.y = 32 * 10;
    }

    let orcXama = new OrcXama({ x: 32 * 11, y: 32 * 6.5, h: 40, w: 16 });
    orcXama.tags.add("orcXama");
    let orcXama2 = new OrcXama({ x: 32 * 7, y: 32 * 6.5, h: 40, w: 16 });
    orcXama2.tags.add("orcXama");

    this.pcCenaJogo = pc;
    this.CoolDown = 0;

    this.OrcCD = 2;
    this.OrcCD2 = 2;
    const cena = this;

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
    orcXama2.controlar = function (dt) {
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
        cena.orcXamaAcaoNoMomento = "PARADO_DIREITA";
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

    this.adicionar(orcXama);
    this.adicionar(orcXama2);
    this.adicionar(pc);
  }
}
