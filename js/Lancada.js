import Sprite from "./Sprite.js";

export default class Lancada extends Sprite {
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
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });
    this.coolDownEsp = 0.5;
  }

  aplicaRestricoes(dt) {
   
    if(this.cena.contador > this.coolDownEsp){
      return true;
    }
    this.aplicaRestricoesDireita(this.mx + 1, this.my);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesCima(this.mx, this.my - 1);

    this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);

    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);

    this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
    this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
  }
}
