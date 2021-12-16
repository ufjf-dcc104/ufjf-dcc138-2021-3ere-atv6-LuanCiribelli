import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

    const img1= new Image();
    img1.src="assets/girl.png";
    const img2= new Image();
    img2.src="assets/orc.png";
    const img3= new Image();
    img3.src="assets/skelly.png";

    document.body.appendChild(img1);
    document.body.appendChild(img2);
    document.body.appendChild(img3);

    const assets = new AssetManager();

const canvas = document.querySelector("canvas");

const cena1 = new Scene(canvas,assets);

const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 140, color: "red" });

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({ y:40, color: "red" }));


cena1.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      cena1.iniciar();

      break;
    case "p":
      cena1.parar();
      break;
    default:
      break;
  }
});
