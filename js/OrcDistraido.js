import Sprite from "./Sprite.js";

export default class OrcDistraido extends Sprite {
  constructor({
    x = 100,
    y = 32 * 10,
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
    this.gravidade = 100;
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });
    this.quadroORC = 0;
    this.poseORC = 0;
  }

  draw(ctx, dt, a, acao) {
    const POSES = [
      { qmax: 7, pv: 7 },
      { qmax: 7, pv: 7 },
      { qmax: 7, pv: 7 },
      { qmax: 7, pv: 7 },
      { qmax: 8, pv: 8 },
      { qmax: 8, pv: 8 },
      { qmax: 8, pv: 8 },
      { qmax: 8, pv: 8 },
      { qmax: 9, pv: 9 },
      { qmax: 9, pv: 9 },
      { qmax: 9, pv: 9 },
      { qmax: 9, pv: 9 },
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
      { qmax: 13, pv: 13 },
      { qmax: 13, pv: 13 },
      { qmax: 13, pv: 13 },
      { qmax: 13, pv: 13 },
      { qmax: 6, pv: 6 },
    ];

  
    
      if (acao == null || acao == "PARADO") {
        this.poseORC = 7;
        this.quadroORC = 0;
      } else if (acao == "PARA_DIREITA") {
        this.poseORC = 5;
        this.quadroORC = 0;
      }

    ctx.drawImage(
      this.cena.assets.img("orcBase"),
      64 * Math.floor(this.quadroORC),
      64 * Math.floor(this.poseORC),
      64,
      64,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w + 32,
      this.h + 32,
    );
  }
}
