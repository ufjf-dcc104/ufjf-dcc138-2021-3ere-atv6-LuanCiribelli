import Sprite from "./Sprite.js";

export default class OrcXama extends Sprite {
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
    this.contadorDePose = 0;
  }

  draw(ctx, dt, a, b,acao ) {
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

    this.quadroORC =
      this.quadroORC >= POSES[this.poseORC].qmax - 1
        ? 0
        : this.quadroORC + POSES[this.poseORC].pv * dt;

    if (this.contadorDePose == 0) {
      if (acao == null || acao == "PARADO") {
        this.poseORC = 7;
        this.quadroORC = 0;
      } else if (acao == "PARADO_ESQUERDA") {
        this.poseORC = 9;
        this.quadroORC = 0;
      } else if (acao == "MOVENDO_PARA_ESQUERDA") {
        this.poseORC = 9;
      } else if (acao == "MOVENDO_PARA_DIREITA") {
        this.poseORC = 11;
      } else if (acao == "BATENDO") {
        if (this.vx < 0) {
          this.poseORC = 5;
          this.contadorDePose = 10 * POSES[this.poseORC].pv;
        } else {
          this.poseORC = 7;
          this.contadorDePose = 10 * POSES[this.poseORC].pv;
        }
      } else if (acao == "ATIRANDO") {
        if (this.vx <= 0) {
          this.poseORC = 1;
        } else {
          this.poseORC = 3;
        }
        this.contadorDePose = 10 * POSES[this.poseORC].pv;
      }
    }
    if (this.contadorDePose > 0) {
      this.contadorDePose += -1;
    }

    ctx.drawImage(
      this.cena.assets.img("orcXama"),
      64 * Math.floor(this.quadroORC),
      64 * Math.floor(this.poseORC),
      64,
      64,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w + 32,
      this.h + 32
    );
  }
}
