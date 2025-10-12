//Tp Final pt1
//Alumnos: Alan Giammarco y Grecia Weber
//Link Video: https://youtu.be/ttpcW8w1gm4?si=YZh_M8339ruJVNYO

let currentScreen = "1";
let imagenes = []; // Arreglo de imágenes
let musicaFondo; 
let yCreditos = 0; 
let mostrandoCreditos = false;

// Recorrido narrativo
let pantallas = {
  "1": { func: pantalla1, opciones: [{label:"Continuar", destino:"2"}] },
  "2": { func: pantalla2, opciones: [{label:"Continuar", destino:"3"}] },
  "3": { func: pantalla3, opciones: [
      {label:"Seguir a Anubis", destino:"4"},
      {label:"Ir por el pasillo", destino:"4A"}
    ] 
  },
  "4": { func: pantalla4, opciones: [{label:"Continuar", destino:"5"}] },
  "4A": { func: pantalla4A, opciones: [
      {label:"Abrirlo", destino:"5A"},
      {label:"Ignorarlo", destino:"4B"}
    ] 
  },
  "5A": { func: pantalla5A, opciones: [{label:"Continuar", destino:"6A"}] },
  "6A": { func: pantalla6A, opciones: [{label:"Ir a la sala", destino:"6"}] },
  "4B": { func: pantalla4B, opciones: [{label:"Continuar", destino:"5B"}] },
  "5B": { func: pantalla5B, opciones: [{label:"Continuar", destino:"CREDITOS"}] },
  "5": { func: pantalla5, opciones: [
      {label:"Aceptarlo", destino:"6"},
      {label:"Defenderte", destino:"5C"}
    ] 
  },
  "6": { func: pantalla6, opciones: [{label:"Continuar", destino:"7"}] },
  "7": { func: pantalla7, opciones: [{label:"Continuar", destino:"CREDITOS"}] }, 
  "5C": { func: pantalla5C, opciones: [{label:"Continuar", destino:"6C"}] },
  "6C": { func: pantalla6C, opciones: [{label:"Continuar", destino:"7C"}] },
  "7C": { func: pantalla7C, opciones: [{label:"Continuar", destino:"CREDITOS"}] }, 
  "CREDITOS": { func: pantallaCreditos, opciones: [] } 
};

//Fin de corrido narrativo

function preload() {
  for (let i = 1; i <= 15; i++) {
    imagenes[i] = loadImage("data/img" + i + ".jpg");
  }
  musicaFondo = loadSound("data/musica.mp3"); 
}

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(220);
  mostrarPantalla(currentScreen);
}

// Pantalla y botones

function mostrarPantalla(id) {
  let p = pantallas[id];
  if (p.func) p.func();

  // Botones
  if (!mostrandoCreditos && p.opciones && p.opciones.length > 0) {
    let xStart = width/2 - (p.opciones.length * 120)/2; 
    for (let i = 0; i < p.opciones.length; i++) {
      let opt = p.opciones[i];
      drawButton(opt.label, xStart + i*120, height - 80, 100, 40, opt.destino);
    }
  }
}

// Pantallas, las imagenes y textos

function pantalla1() {
  image(imagenes[1], 0, 0, width, height); 
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(245, 245, 220);
  text("EL JUICIO DE LAS ALMAS", width/2, height/2);
}

function pantalla2() {
  image(imagenes[2], 0, 0, width, height);
  textAlign(CENTER, TOP);
  textSize(28);
  fill(245, 245, 220);
  text("Te encuentras con el Dios Anubis", width/2, 100);

  textSize(15);
  text(
    "Su mirada brilla en la penumbra.\n" +
    "Has muerto... tu alma será pesada contra la pluma de Maat.\n" +
    "Antes, debes decidir cómo llegarás a la sala del juicio.",
    width/2 - 250, 160, 500, 200);
}

function pantalla3() {
  image(imagenes[3], 0, 0, width, height);
  textSize(28);
  fill(245, 245, 220);
  textAlign(CENTER, TOP);
  text("Elige tu camino", width/2, 100);
}

function pantalla4() {
  image(imagenes[4], 0, 0, width, height);
  textSize(26);
  fill(245, 245, 220);
  textAlign(CENTER, TOP);
  text("Llegan a una gran sala dorada", width/2, 100);
}

function pantalla4A() {
  image(imagenes[7], 0, 0, width, height);
  textSize(26);
  fill(245, 245, 220);
  textAlign(CENTER, TOP);
  text("En el pasillo te encontras con un cofre", width/2, 100);
}

function pantalla5A() {
  image(imagenes[8], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Adentro hay un amuleto con la forma de chacal.", width/2, height/2);
}

function pantalla6A() {
  image(imagenes[10], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Anubis te mira y dice mostraste valentía.", width/2, height/2);
}

function pantalla4B() {
  image(imagenes[9], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Las sombras se vuelven densas...\nEl piso se abre bajo tus pies.", width/2, height/2);
}

function pantalla5B() {
  image(imagenes[11], 0, 0, width, height);
  textSize(16);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Caes en un río ardiente.\nVoces condenadas te rodean.\nTu alma queda atrapada eternamente en el fuego.", width/2, height/2);
}

function pantalla5() {
  image(imagenes[5], 0, 0, width, height);
  fill(245, 245, 220);
  textSize(20);
  textAlign(CENTER, TOP);
  text(
    "Anubis coloca tu corazón en la balanza.\n" +
    "¿Aceptarás el juicio en silencio o intentarás defender tus actos?",
    width/2 - 250, 120, 500, 200);
}

function pantalla6() {
  image(imagenes[5], 0, 0, width, height);
  fill(245, 245, 220);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Tu corazón se equilibra con la pluma de Maat.\nViviste con justicia.", width/2 - 250, 135, 500, 200 );
}

function pantalla7() {
  image(imagenes[6], 0, 0, width, height);
  fill(0);
  textAlign(CENTER, TOP);
  textSize(25);
  text(
    "Accedes al Paraíso de los Juncos, el campo eterno de la paz.\n" +
    "¡Felicidades!",
    width/2 - 250, 120, 500, 200);
}

function pantalla5C() {
  image(imagenes[5], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Tu voz hace vibrar la balanza...\nEl corazón se vuelve pesado.", width/2, height/2);
}

function pantalla6C() {
  image(imagenes[14], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Sientes una presencia en la oscuridad.", width/2, height/2);
}

function pantalla7C() {
  image(imagenes[12], 0, 0, width, height);
  textSize(20);
  fill(245, 245, 220);
  textAlign(CENTER, CENTER);
  text("Ammit te devora. Tu existencia desaparece.", width/2, height/2);
}

// Pantalla de créditos
function pantallaCreditos() {
  mostrandoCreditos = true;
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);

  yCreditos -= 2; // velocidad de subida
  if (yCreditos < -300) {
    // cuando sale de pantalla, reinicia
    mostrandoCreditos = false;
    yCreditos = height + 200;
    currentScreen = "1";
    return;
  }

  text("CRÉDITOS", width / 2, yCreditos);
  textSize(20);
  text("Hecho por Alan Giammarco y Grecia Weber", width / 2, yCreditos + 60);
  textSize(20);
  text("¡Muchas gracias!", width / 2, yCreditos + 120);
}

// Botones
function drawButton(label, x, y, w, h, destino) {
  fill(200);
  stroke(0);
  rect(x, y, w, h, 5);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(label, x + w/2, y + h/2);

  if (!drawButton.lista) drawButton.lista = [];
  drawButton.lista.push({x,y,w,h,destino});
}
  // Funcion de musica
function mousePressed() {
  if (musicaFondo && !musicaFondo.isPlaying()) {
    musicaFondo.loop();
  }
// Creditos movimiento
  if (!drawButton.lista) return;
  for (let b of drawButton.lista) {
    if (mouseX > b.x && mouseX < b.x + b.w &&
        mouseY > b.y && mouseY < b.y + b.h) {
      currentScreen = b.destino;
      if (b.destino === "CREDITOS") {
        yCreditos = height + 200; 
      }
    }
  }
  drawButton.lista = [];
}
