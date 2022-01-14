
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class {
  constructor(linhas = 8, colunas = 12, tamanho = 32) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.SIZE = tamanho;
    this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = 0;
      }
    }
    this.cena = null;
  }

  draw(ctx) {
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        ctx.drawImage(
          this.cena.assets.img("chao"),
          32*getRandomIntInclusive(0,2),
          32*5,
          32,
          32,
          c * this.SIZE,
          l * this.SIZE,
          this.SIZE,
          this.SIZE
        );
        switch (this.tiles[l][c]) {
          case 1:
            if (this.cena.assets.img("paredes")) {
              ctx.drawImage(
                this.cena.assets.img("paredes"),
                0,
                10,
                32,
                38,
                c * this.SIZE,
                l * this.SIZE -6,
                32,
                38
              );
            } else {
              ctx.fillStyle = "grey";
              ctx.lineWidth = 1;
              ctx.strokeStyle = "black";
            }
            break;
          case 2:
            ctx.fillStyle = "red";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "orange";
            break;
          default:
            ctx.drawImage(
              this.cena.assets.img("chao"),
              32*getRandomIntInclusive(0,2),
              32*5,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
        }
      }
    }
  }

  carregaMapa(modelo) {
    this.LINHAS = modelo.length;
    this.COLUNAS = modelo[0]?.length ?? 0;

    this.tiles = [];

    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = modelo[l][c];
      }
    }
  }

  retornaPosicao(l, c) {
    if (l < this.LINHAS && c < this.COLUNAS && this.tiles[l][c] == 0) {
      console.log(this.tiles[l][c]);
      return this.tiles[l][c] ;
    } else {
      //console.log("Maior que o limite");
    }
  }
}
