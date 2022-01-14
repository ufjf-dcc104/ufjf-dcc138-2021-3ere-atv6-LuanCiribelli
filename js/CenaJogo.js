import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export default class CenaJogo extends Cena {
  onColisao(a, b) {
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.rodando = false;
      this.game.cena.assets.play("derrota");
      this.game.selecionaCena("fim");
    }
  
  }

  checaFim(){
    if (this.sprites.length == 1) {
      this.rodando = false;
      this.game.selecionaCena("vitoria");
    }
  }
  /*
checaTempo(t0){
  if(t0>=10){

    let randX = getRandomIntInclusive(32,576);
    let randy = getRandomIntInclusive(32,352);


    if(this.mapa1[parseInt(Math.floor((randX)/32))][parseInt(Math.floor((randy)/32))] == 1){
    if( this.sprites.find('pc').x != randX 
    &&this.sprites.get('pc').y != randy ){

      randX = getRandomIntInclusive(32,576);
      randy = getRandomIntInclusive(32,352);

    }

    this.adicionar( new Sprite({
      x: randX,
      y: randy,
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    }))
 // }
  }
}
*/
  preparar() {
    super.preparar();
    const mapa1 = new Mapa(12, 15, 32);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);
 
    const pc = new Sprite({ x: (32*2), y: (32*2) });
    pc.tags.add("pc");
    const cena = this;
    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
      }
      if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
      }
      if (cena.input.comandos.get("MOVE_CIMA")) {
        this.vy = -50;
      }
      if (cena.input.comandos.get("MOVE_BAIXO")) {
        this.vy = +50;
      }
    };

    this.adicionar(pc);

    function perseguePC(dt) {
      this.vx = 20 * Math.sign(pc.x - this.x);
      this.vy = 20 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({
      x: (32*3),
      y: (32*2),
      color: "red",
      controlar: perseguePC,
      tags: ["enemy"],
    });
    this.adicionar(en1);

  }
}
