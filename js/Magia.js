import Sprite from "./Sprite.js";

export default class Magia extends Sprite {
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
    lado = "Direita"
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
    this.lado = lado;
    this.quadroMagia = 0;
    this.quadroMagia2 = 4;
  }

  draw(ctx, dt, acao) {

    if (this.lado == "Direita") {
      if (this.quadroMagia <= 4) {
        ctx.drawImage(
          this.cena.assets.img("tiro"),
          32 * Math.floor(this.quadroMagia),
          32 * 1,
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
          this.cena.assets.img("tiro"),
          32 * 2,
          32 * 2,
          32,
          32,
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      }
    } else {
      if (this.quadroMagia2 >= 0) {
        ctx.drawImage(
          this.cena.assets.img("tiro2"),
          32 * Math.floor(this.quadroMagia),
          32 * 2,
          32,
          32,
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h,
        );
        this.quadroMagia2 -= 1;
      } else {
        ctx.drawImage(
          this.cena.assets.img("tiro2"),
          32 * 1,
          32 * 1,
          32,
          32,
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h,
        );
      }
    }
  }
}
