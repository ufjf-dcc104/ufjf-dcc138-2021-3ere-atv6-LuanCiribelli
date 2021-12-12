export default class Sprite{

    constructor(){
        this.x=0;
        this.y=0;
        this.w=0;
        this.h = 0;
        this.color="white"
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}