export default class AssetManager {
  constructor() {
    this.aCarregar = 0;
    this.carregadas = 0;
    this.images = new Map();
  }

  carregaImagem(chave, source) {
    const img1 = new Image();
    img1.src = source;
    this.images.set(chave,img1);
  }

  img(chave){
      return this.images.get(chave);
  }

  progresso() {
    if (this.aCarregar > 0) {
      return `${((this.carregadas / this.aCarregar) * 100).toFixed(2)}%`;
    }
    return "Tudo carregado";
  }
}
