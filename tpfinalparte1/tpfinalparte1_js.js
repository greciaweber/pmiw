// Weber, Grecia 119170/0 COMISIÓN 5
// Link al video explicativo: https://youtu.be/n6QjnET84Lc

let pantallas = [];
let estado = 0; 
let musicaFondo; 
let musicaIniciada = false; 
let BotonIniciar, BotonCreditos, BotonSiguiente, BotonInicio, opcion1, opcion2;
let textos = [
  "", 
  "Lara Croft vive en Londres, trabajando como mensajera en bicicleta.",
  "Su padre desaparece de forma misteriosa.",
  "Descubre un estudio secreto perteneciente a su padre.",
  "Lara decide investigar por su cuenta y seguir las pistas que él dejó lo que la lleva a una peligrosa aventura.",
  "Viaje a la isla de Yamatai.",
  "Lara es capturada por unos mercenarios al llegar a la isla.",
  "La búsqueda de la tumba de Himiko.",
  "Descubrimiento de la verdad sobre Himiko.",
  "Reencuentro con su padre.",
  "Lucha por detener a Vogel.",
  "Enfrentamiento final.",
  "Lara asume su destino. FIN",
  "El barco es destruido por la fuerte tormenta.",
  "Lara sobrevive y queda varada en una tabla de madera.",
  "Lara muere por deshidratación y hambruna al estar mucho tiempo varada en el océano. FIN",
  "El poder de Hakimao cae en manos de Vogel.",
  "Vogel se vuelve más poderoso que nunca y enfrenta a Lara.",
  "Lara se sacrifica por el bien de su padre y de la humanidad para destruir a Vogel. FIN",
];

function preload() {
  for (let i = 0; i <= 19; i++) {
    pantallas[i] = loadImage(`assets/imagen${i}.png`);
  }
  musicaFondo = loadSound('assets/musica_fondo.mp3');
  efectoClick = loadSound('assets/efecto_click.mp3');
}
function setup() {
  createCanvas(640, 480); 
  textFont("Times New Roman");
  crearBotones();
}
function draw() {
  background(0);
  if (pantallas[estado]) {
    image(pantallas[estado], 0, 0, width, height);
  }
  if (estado === 19) {
    fill(255); 
    textAlign(CENTER, CENTER); 
    textSize(32); 
    text("CRÉDITOS", width / 2, height / 4); 
    textSize(20); 
    text("Weber, Grecia 119170/0", width / 2, height / 2); 
  }
  else if (estado > 0) {
    fill(0, 200);
    noStroke();
    rect(0, height - 150, width, 150);
    fill(255); 
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD); 
    
    drawMultilineText(textos[estado], width/2, height - 100, width - 40, 20);
  }
  manejarBotones();
}
function drawMultilineText(txt, x, y, maxWidth, lineHeight) {
  let words = txt.split(' ');
  let currentLine = '';
  let currentY = y;

  for (let word of words) {
    let testLine = currentLine + word + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth) {
      text(currentLine, x, currentY);
      currentLine = word + ' ';
      currentY += lineHeight;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    text(currentLine, x, currentY);
  }
}

function crearBotones() {
  BotonIniciar = createButton("Iniciar Aventura");
  BotonIniciar.position(220, 200);
  BotonIniciar.style("font-size", "20px");
  BotonIniciar.style("padding", "10px 20px");
  BotonIniciar.style("background-color", "white"); 
  BotonIniciar.style("color", "black"); 
  BotonIniciar.style("border", "none"); 
  BotonIniciar.mousePressed(iniciarAventura);
  BotonIniciar.hide();
  BotonCreditos = createButton("Créditos");
  BotonCreditos.position(220, 300);
  BotonCreditos.style("font-size", "20px");
  BotonCreditos.style("padding", "10px 20px");
  BotonCreditos.style("background-color", "white");
  BotonCreditos.style("color", "black");
  BotonCreditos.style("border", "none");
  BotonCreditos.mousePressed(() => {
    if (!musicaIniciada) {
      iniciarMusica();
    }
    cambiarEstado(19);
  });
  BotonCreditos.hide();
  
  BotonSiguiente = createButton("Siguiente");
  BotonSiguiente.position(width - 150, height - 50);
  BotonSiguiente.size(130, 40);  // Tamaño específico
  BotonSiguiente.style("background-color", "white");
  BotonSiguiente.style("color", "black");
  BotonSiguiente.style("border", "none");
  BotonSiguiente.mousePressed(() => cambiarEstado(estado + 1));
  BotonSiguiente.hide();
  BotonInicio = createButton("Regresar al inicio");
  BotonInicio.position(10, 10);
  BotonInicio.size(130, 40);
  BotonInicio.style("background-color", "white");
  BotonInicio.style("color", "black");
  BotonInicio.style("border", "none");
  BotonInicio.mousePressed(() => {
    if (musicaFondo && musicaFondo.isPlaying()) {
      musicaFondo.stop();
    }
    musicaIniciada = false;
    cambiarEstado(0);
  });
  BotonInicio.hide();
  opcion1 = createButton("");
  opcion1.position(width/2 - 200, height - 50);
  opcion1.size(180, 40);  // Dar un tamaño específico
  opcion1.style("background-color", "white");
  opcion1.style("color", "black");
  opcion1.style("border", "none");
  opcion1.style("font-size", "14px");
  opcion1.mousePressed(() => manejarOpciones("Opcion1"));
  opcion1.hide();
  opcion2 = createButton("");
  opcion2.position(width/2 + 20, height - 50);
  opcion2.size(180, 40);  // Dar un tamaño específico
  opcion2.style("background-color", "white");
  opcion2.style("color", "black");
  opcion2.style("border", "none");
  opcion2.style("font-size", "14px");
  opcion2.mousePressed(() => manejarOpciones("Opcion2"));
  opcion2.hide();
}
function iniciarAventura() {
  iniciarMusica();
  cambiarEstado(1);
}
function iniciarMusica() {
  if (musicaFondo && !musicaIniciada) {
    musicaFondo.setVolume(0.5);
    musicaFondo.loop();
    musicaIniciada = true;
  }
}

function manejarBotones() {
  BotonIniciar.hide();
  BotonCreditos.hide();
  BotonSiguiente.hide();
  BotonInicio.hide();
  opcion1.hide();
  opcion2.hide();
   if (estado === 0) {
    BotonIniciar.show();
    BotonCreditos.show();
  } else if (estado === 19) {
    BotonInicio.show();
  } else {
    BotonInicio.show();
    if (estado === 5) {
      opcion1.show();
      opcion1.html("Camino corto pero peligroso");
      opcion2.show();
      opcion2.html("Camino largo pero seguro");
    } else if (estado === 14) {
      opcion1.show();
      opcion1.html("Remar hasta tierra firme");
      opcion2.show();
      opcion2.html("Esperar por ayuda");
    } else if (estado === 10) {
      opcion1.show();
      opcion1.html("El padre escapa con Lara");
      opcion2.show();
      opcion2.html("El padre se entrega");
    } else if (estado === 17) {
      opcion1.show();
      opcion1.html("Lara activa un conjuro secreto");
      opcion2.show();
      opcion2.html("El padre de Lara activa un conjuro");
    } else if (estado < 12 || (estado > 12 && estado !== 15 && estado !== 18)) {
      BotonSiguiente.show();
    }
  }
}
function manejarOpciones(eleccion) {
  if (estado === 5) {
    if (eleccion === "Opcion1") cambiarEstado(13); 
    else if (eleccion === "Opcion2") cambiarEstado(6); 
  } else if (estado === 14) {
    if (eleccion === "Opcion1") cambiarEstado(6); 
    else if (eleccion === "Opcion2") cambiarEstado(15); 
  } else if (estado === 10) {
    if (eleccion === "Opcion1") cambiarEstado(16); 
    else if (eleccion === "Opcion2") cambiarEstado(17); 
  } else if (estado === 17) {
    if (eleccion === "Opcion1") cambiarEstado(18); 
    else if (eleccion === "Opcion2") cambiarEstado(11); 
  }
}
function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
}
