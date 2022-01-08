export default class InputManager {
  constructor() {
    this.comandos = new Map();
    this.teclas = new Map();
  }

  configurarTeclado(acoes) {
    for (const tecla in acoes) {
      const comando = acoes[tecla];
      this.comandos.set(comando, false);
      this.teclas.set(tecla, comando);
    }

    const that = this;
    addEventListener("keydown", function (e) {
      const tecla = that.get(e.key);
      if(comando){
          that.comandos.set(comando,true);
      }
    });
    addEventListener("keyUp", function (e) {
        const tecla = that.get(e.key);
        if(comando){
            that.comandos.set(comando,false);
        }
      });
  }
}
