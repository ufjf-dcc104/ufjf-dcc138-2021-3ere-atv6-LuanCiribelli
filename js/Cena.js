export default class Cena {
  /* Desenha elementos na tela nas animações*/

  constructor(canvas = null, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.game = null;
    this.preparar();
  }

  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mapa?.draw(this.ctx);

    if (this.assets.acabou()) {
      this.sprites.forEach((sprite) => {
        sprite.draw(this.ctx);
        sprite.aplicaRestricoes();
      });
    }

    
    this.ctx.fillStyle = "orange";
    let end = new Date();
    let timeDiff = end - this.game.timer;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    this.ctx.fillText(`Timer: ${seconds}`, 32*17, 20);
  }

  adicionar(sprite) {
    sprite.cena = this;
    this.sprites.push(sprite);
  }
  passo(dt) {
    if (this.assets.acabou())
      this.sprites.forEach((sprite) => {
        sprite.passo(dt);
      });
  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.passo(this.dt);
    this.draw();
    this.checaColisao();
    this.removerSprites();
    this.checaFim();
    if (this.contador > 2) {
      this.criaInimigo();
      this.contador = 0;
    }
    if (this.rodando) {
      this.contador += 1*this.dt;
      this.iniciar();
    }
    this.t0 = t;
  }

  checaFim() {}
  criaInimigo() {}

  iniciar() {
    this.rodando = true;
    this.idAnim = requestAnimationFrame((t) => {
      this.quadro(t);
    });
  }
  parar() {
    this.rodando = false;
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
    this.dt = 0;
  }
  checaColisao() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];
      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];
        if (spriteA.colidiuCom(spriteB)) {
          this.onColisao(spriteA, spriteB);
        }
      }
    }
  }
  onColisao(a, b) {
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }

    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
  }

  removerSprites() {
    for (const alvo of this.aRemover) {
      const idx = this.sprites.indexOf(alvo);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }
    this.aRemover = [];
  }

  configuraMapa(mapa) {
    this.mapa = mapa;
    this.mapa.cena = this;
  }

  preparar() {
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.mapa = null;
    this.contador = 0;
    this.rodando = true;
  }
}
