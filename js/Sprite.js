export default class Sprite {
  /*
    Modelar objetos moveis
*/
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
    this.quadroPC = 0;
    this.posePC = 0;
    this.quadroMagia = 0;
    this.contadorDePose = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  drawMagia(ctx, dt) {


    if (this.quadroMagia <= 4) {
      this.quadroMagia += 1;

      ctx.drawImage(
        this.cena.assets.img("tiro"),
        32 * Math.floor(this.quadroMagia),
        32 * 2,
        32,
        32,
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
    } else {
      ctx.drawImage(
        this.cena.assets.img("tiro"),
        32 * 3,
        32 * 3,
        32,
        32,
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
    }
  }

  drawPC(ctx, dt, acao) {
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
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
      { qmax: 6, pv: 6 },
    ];

    this.quadroPC =
      this.quadroPC >= POSES[this.posePC].qmax - 1
        ? 0
        : this.quadroPC + POSES[this.posePC].pv * dt;

    if (this.contadorDePose == 0) {
      if (acao == null || acao == "PARADO") {
        this.posePC = 10;
        this.quadroPC = 0;
      } /*if ((acao == "PULANDO")) {
      this.posePC = 19;
      this.contadorDePose = 7 * POSES[this.posePC].pv;
    } else */ else if (acao == "MOVENDO_PARA_ESQUERDA") {
        this.posePC = 9;
      } else if (acao == "MOVENDO_PARA_DIREITA") {
        this.posePC = 11;
      } else if (acao == "ATIRANDO") {
        this.posePC = 7;
        this.contadorDePose = 7 * POSES[this.posePC].pv;
      }
      else if (acao == "BATENDO"){
        this.posePC = 22;
        this.contadorDePose = 7 * POSES[this.posePC].pv;
        this.quadroPC = 2* this.quadroPC;
      }
    }
    if (this.contadorDePose > 0) {
      this.contadorDePose += -1;
    }
    ctx.drawImage(
      this.cena.assets.img("pc"),
      64 * Math.floor(this.quadroPC),
      64 * Math.floor(this.posePC),
      64,
      64,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }

  controlar(dt) {}

  mover(dt) {
    //y = y + vydt +gdt*dt
    this.vy += this.gravidade * dt;
    this.y = +this.y + this.vy * dt;
    this.x = this.x + this.vx * dt;
    this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
    this.my = Math.floor(this.y / this.cena.mapa.SIZE);
  }
  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
  }

  colidiuCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }

  aplicaRestricoes(dt) {
    this.aplicaRestricoesDireita(this.mx + 1, this.my);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesCima(this.mx, this.my - 1);

    this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
    //Esquerda

    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
    //Baixo

   if(this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1)){
     return true;
   };
    if(this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1)){
      return true;
    };
    //Cima

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
        }
      }
    }
  }
  aplicaRestricoesBaixo(pmx, pmy) {
    if (this.vy > 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] == 4) {

        return true;
      }

      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };

        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
    
    }
  }
  aplicaRestricoesCima(pmx, pmy) {
    if (this.vy < 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };

        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
    }4
  }
}
