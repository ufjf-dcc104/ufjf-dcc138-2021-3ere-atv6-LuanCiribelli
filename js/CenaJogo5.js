import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Machadada from "./Machadada.js";
import Lancada from "./Lancada.js";
import NPCResgatar from "./NPC_Resgatar.js";
import OrcEscudo from "./OrcEscudo.js";
import OrcXama from "./OrcXama.js";
import MagiaInimigo from "./MagiaInimigo.js";
import { mapa5 as modeloMapa5 } from "../maps/mapa5.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogo5 extends Cena {
  onColisao(a, b) {
    if (
      (a.tags.has("pc") && b.tags.has("tiro")) ||
      (a.tags.has("pc") && b.tags.has("espada")) ||
      (b.tags.has("pc") && a.tags.has("tiro")) ||
      (b.tags.has("pc") && a.tags.has("espada"))
    ) {
    } else {
      if (
        (a.tags.has("pc") && b.tags.has("npc")) ||
        (a.tags.has("npc") && b.tags.has("pc"))
      ) {
        this.rodando = false;
        this.assets.play("vitoria");
        this.game.selecionaCena("vitoria");
      } else if (
        (a.tags.has("orcBase") && b.tags.has("espadaORC")) ||
        (a.tags.has("espadaORC") && b.tags.has("orcBase"))
      ) {
      } else if (
        (a.tags.has("orcBase") && b.tags.has("tiroXama")) ||
        (a.tags.has("tiroXama") && b.tags.has("orcBase")) ||
        (a.tags.has("tiroXama") && b.tags.has("orcXama")) ||
        (a.tags.has("orcXama") && b.tags.has("tiroXama"))
      ) {
      } else {
        if (!this.aRemover.includes(a)) {
          a.vidas -= 1;
          if (a.vidas <= 0) {
            this.aRemover.push(a);
          }
        }
        if (!this.aRemover.includes(b)) {
          b.vidas -= 1;
          if (b.vidas <= 0) {
            this.aRemover.push(b);
          }
        }

        if (
          (a.tags.has("pc") && b.tags.has("enemy")) ||
          (a.tags.has("pc") && b.tags.has("tiroXama")) ||
          (a.tags.has("pc") && b.tags.has("espadaORC")) ||
          (a.tags.has("pc") && b.tags.has("orcBase")) ||
          (a.tags.has("pc") && b.tags.has("orcXama")) ||
          a.tags.has("npc") ||
          b.tags.has("npc")
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
            this.onColisao(sprite, sprite);
          }
        }
      });
    }
  }
  checaFim() {
    if (this.pcCenaJogo.x < 17) {
      this.game.selecionaCena("fase4", 2);
    }
    if (this.sprites.length == 0) {
      this.game.selecionaCena("fim", 0);
    }
  }

  preparar(porta) {
    super.preparar();
    const mapa5 = new Mapa(19, 12, 32);
    mapa5.carregaMapa(modeloMapa5);
    this.configuraMapa(mapa5);
    this.mapa = mapa5;
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
    this.pcCenaJogo = pc;
    this.CoolDown = 0;

    let npcResgatar = new NPCResgatar({
      x: 18 * 32,
      y: 10.5 * 32,
      h: 16,
      w: 16,
    });
    npcResgatar.tags.add("npc");

    let orc = new OrcEscudo({ x: 32 * 10, y: 32 * 10, h: 32, w: 32, vidas: 3 });
    orc.tags.add("orcBase");
    let orcXama = new OrcXama({ x: 32 * 16, y: 32 * 10, h: 16, w: 16 });
    orcXama.tags.add("orcXama");

    this.OrcCD = 4;
    this.MagiaOrcCd = 0;
    this.orcXamaAcaoNoMomento;
    const cena = this;

    orc.controlar = function (dt) {
      if (this.x - 64 < cena.pcCenaJogo.x && this.x + 64 > cena.pcCenaJogo.x) {
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
        this.vx = 30 * Math.sign(pc.x - this.x);
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
          x: this.x - 5,
          y: this.y + 10,
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
        if (cena.CoolDown <= 0 && this.mana >0) {
          cena.acaoNoMomento = "ATIRANDO";
          if (this.vx < 0) {
            var tiro = new Magia({
              x: this.x - 50,
              y: this.y - 10,
              vx: -100,
            });
          } else {
            var tiro = new Magia({
              x: this.x + 50,
              y: this.y - 10,
              vx: +100,
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
        console.log(cena.CoolDown);
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

    this.adicionar(npcResgatar);
    this.adicionar(orc);
    this.adicionar(orcXama);
    this.adicionar(pc);
  }
}
