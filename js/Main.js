import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cena1 = new Scene(canvas);
cena1.draw();

const pc = new Sprite();
pc.x = 100;
pc.y = 100;
pc.w = 20;
pc.h = 20;
pc.draw(ctx);
