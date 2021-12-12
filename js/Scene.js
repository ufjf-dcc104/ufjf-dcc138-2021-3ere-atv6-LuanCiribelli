export default class Scene {
  /* Desenha elementos na tela nas animações*/

   
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sprites = [];
  }

  draw() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.sprites.forEach(sprite => {
        sprite.draw(this.ctx);
    });
  }

    adicionar(sprite){
        this.sprites.push(sprite);
    }
}
