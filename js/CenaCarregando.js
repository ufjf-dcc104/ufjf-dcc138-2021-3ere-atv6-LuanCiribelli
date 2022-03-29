import Cena from "./Cena.js";

export default class CenaCarregando extends Cena {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "20px Impact ";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.assets?.progresso(),
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.acabou()) {
      this.game.selecionaCena("fase1", 1);
      return;
    }
    this.draw();

    this.iniciar();
    this.t0 = t;
  }
}
