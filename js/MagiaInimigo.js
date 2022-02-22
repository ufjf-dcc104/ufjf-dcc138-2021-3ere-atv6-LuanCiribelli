import Sprite from "./Sprite.js";

export default class MagiaInimigo extends Sprite {
  constructor({
    x = 100,
    y = 100,
    w = 20,
    h = 20,
    vx = 0,
    vy = 0,
    color = "white",
    controlar = () => {},
    tags = [],
  } = {}) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.mx = 0;
    this.my = 0;
    this.color = color;
    this.cena = null;
    this.controlar = controlar;
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });

    this.quadroMagia = 0;
  }

  draw(ctx, dt, acao) {
    if (this.quadroMagia <= 4) {
      ctx.drawImage(
        this.cena.assets.img("MagiaInimigo"),
        32 * Math.floor(this.quadroMagia),
        32 * 0,
        32,
        32,
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
      this.quadroMagia += 1;
    } else {
      ctx.drawImage(
        this.cena.assets.img("MagiaInimigo"),
        32 * 0,
        32 * 1,
        32,
        32,
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
    }
  //  ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  aplicaRestricoes(dt) {
    if (this.aplicaRestricoesDireita(this.mx + 1, this.my)) {
      return true;
    }
    if (this.aplicaRestricoesEsquerda(this.mx - 1, this.my)) {
      return true;
    }
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesCima(this.mx, this.my - 1);

    if (this.aplicaRestricoesDireita(this.mx + 1, this.my - 1)) {
      return true;
    }
    if (this.aplicaRestricoesDireita(this.mx + 1, this.my + 1)) {
      return true;
    }

    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);

    this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
    this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
  }
  aplicaRestricoesDireita(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx > 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };

        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
          return true;
        }
      }
    }
    
  }
  aplicaRestricoesEsquerda(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx < 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };

        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
          return true;
        }
      }
    }
  }
}
