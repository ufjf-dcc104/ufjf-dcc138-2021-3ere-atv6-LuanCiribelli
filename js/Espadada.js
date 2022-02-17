import Sprite from "./Sprite.js";

export default class Espadada extends Sprite {

   
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
      }
      

}

