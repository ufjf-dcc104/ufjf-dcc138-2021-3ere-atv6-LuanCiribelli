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
        switch (this.tiles[l][c]) {
          case 1:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              32 * 2,
              188,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 2:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              32 * 3,
              32 * 7,
              32,
              64,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 6:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              32 * 19,
              32 * 8,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 7:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              32 * 19,
              32 * 7,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 8:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              532,
              59,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 12:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              40,
              190,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 13:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              66,
              190,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 14:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              96,
              190,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 15:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              40,
              225,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 16:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              64,
              225,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 17:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              95,
              225,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 18:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              40,
              256,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 19:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              62,
              256,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          case 20:
            ctx.drawImage(
              this.cena.assets.img("tiles"),
              96,
              256,
              32,
              32,
              c * this.SIZE,
              l * this.SIZE,
              this.SIZE,
              this.SIZE
            );
            break;
          default:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            break;
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

  retornaPosicao(linha, coluna) {
    if (linha < this.LINHAS && coluna < this.COLUNAS) {
      return this.tiles[linha][coluna];
    } else {
      return false;
    }
  }
}
