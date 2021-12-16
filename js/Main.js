import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

   const assets = new AssetManager(); 
   
   assets.carregaImagem("garota","assets/girl.png");
   assets.carregaImagem("orc"," assets/orc.png");
   assets.carregaImagem("skelly","assets/skelly.png");
  
  

    document.body.appendChild(assets.img("garota"));
    document.body.appendChild(assets.img("orc"));
    document.body.appendChild(assets.img("skelly"));

    

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
