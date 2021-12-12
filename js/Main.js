import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cena1 = new Scene(canvas);
cena1.draw();

const pc = new Sprite();
const en1 = new Sprite({x:140,color:"red"});

pc.draw(ctx);
en1.draw(ctx);
