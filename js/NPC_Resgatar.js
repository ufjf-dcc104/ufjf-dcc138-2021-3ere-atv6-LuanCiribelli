import Sprite from "./Sprite.js";

export default class NPC_Resgatar extends Sprite {


  draw(ctx, dt ) {



    ctx.drawImage(
      this.cena.assets.img("npcResgatar"),
      64 * 3,
      64 * 20,
      64,
      64,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w +16,
      this.h +16,
    );
  }
}
