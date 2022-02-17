import Sprite from "./Sprite.js";



export default class Magia extends Sprite {

   
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

        this.quadroMagia = 0;
      }
    
  
      draw(ctx, dt, acao) {
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

}

