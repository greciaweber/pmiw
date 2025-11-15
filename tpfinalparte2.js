// Tp Final - Etapa 2
// Alumnos: Alan Giammarco - Grecia Weber
// Link Video: https://youtu.be/eDjJm3aBKnE?feature=shared

let imagenes = [];
let musicaFondo;
let plumaImg;

let miJuego;

function preload() {
  for (let i = 0; i < 15; i++) {
    imagenes[i] = loadImage("data/img" + (i + 1) + ".jpg");
  }
  plumaImg = loadImage("data/pluma.png");
  musicaFondo = loadSound("data/musica.mp3");
}

function setup() {
  createCanvas(640, 480);
  miJuego = new JuegoWeb(imagenes, plumaImg, musicaFondo);
}

function draw() {
  miJuego.actualizar();
}

function mousePressed() {
  miJuego.click();
}

class JuegoWeb {
  constructor(assetsImagenes, assetPluma, assetMusica) {
    this.imagenes = assetsImagenes;
    this.plumaImg = assetPluma;
    this.musicaFondo = assetMusica;

    this.currentScreen = "1";
    this.yCreditos = 0;
    this.mostrandoCreditos = false;
    this.juegoPluma = null;
    this.listaBotones = [];

    this.pantallas = {
      "1": { func: () => this.pantalla1(), opciones: [{ label: "Continuar", destino: "2" }] },
      "2": { func: () => this.pantalla2(), opciones: [{ label: "Continuar", destino: "3" }] },
      "3": {
        func: () => this.pantalla3(),
        opciones: [
          { label: "Seguir a Anubis", destino: "4" },
          { label: "Ir por el pasillo", destino: "4A" }
        ]
      },
      "4": { func: () => this.pantalla4(), opciones: [{ label: "Continuar", destino: "5" }] },
      "4A": {
        func: () => this.pantalla4A(),
        opciones: [
          { label: "Abrirlo", destino: "5A" },
          { label: "Ignorarlo", destino: "4B" }
        ]
      },
      "5A": { func: () => this.pantalla5A(), opciones: [{ label: "Continuar", destino: "6A" }] },
      "6A": { func: () => this.pantalla6A(), opciones: [{ label: "Ir a la sala", destino: "6" }] },
      "4B": { func: () => this.pantalla4B(), opciones: [{ label: "Continuar", destino: "5B" }] },
      "5B": { func: () => this.pantalla5B(), opciones: [{ label: "Continuar", destino: "CREDITOS" }] },
      "5": {
        func: () => this.pantalla5(),
        opciones: [
          { label: "Aceptar el juicio", destino: "MINIJUEGO_PLUMA" },
          { label: "Defenderte", destino: "5C" }
        ]
      },
      "6": { func: () => this.pantalla6(), opciones: [{ label: "Continuar", destino: "7" }] },
      "7": { func: () => this.pantalla7(), opciones: [{ label: "Continuar", destino: "CREDITOS" }] },
      "5C": { func: () => this.pantalla5C(), opciones: [{ label: "Continuar", destino: "6C" }] },
      "6C": { func: () => this.pantalla6C(), opciones: [{ label: "Continuar", destino: "7C" }] },
      "7C": { func: () => this.pantalla7C(), opciones: [{ label: "Continuar", destino: "CREDITOS" }] },
      "CREDITOS": { func: () => this.pantallaCreditos(), opciones: [] }
    };
  }

  actualizar() {
    background(220);
    this.listaBotones = [];

    if (this.currentScreen === "MINIJUEGO_PLUMA") {
      if (!this.juegoPluma) {
        this.juegoPluma = new JuegoPluma(this, this.plumaImg);
      }
      this.juegoPluma.mostrar();
    } else {
      this.mostrarPantalla(this.currentScreen);
    }
  }

  click() {
    if (this.musicaFondo && !this.musicaFondo.isPlaying()) {
      this.musicaFondo.loop();
    }

    if (this.currentScreen === "MINIJUEGO_PLUMA" && this.juegoPluma) {
      this.juegoPluma.click(mouseX, mouseY);
      if (this.juegoPluma.perdio) {
        this.chequearBotones();
      }
      return;
    }

    this.chequearBotones();
  }

  chequearBotones() {
    for (let b of this.listaBotones) {
      if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
        let destino = b.destino;
        
        if (this.currentScreen === "MINIJUEGO_PLUMA" && destino === "MINIJUEGO_PLUMA") {
             this.juegoPluma = null;
        }
        
        this.cambiarPantalla(destino);
        
        if (destino === "CREDITOS") {
          this.yCreditos = height + 200;
        }
        return;
      }
    }
  }

  cambiarPantalla(destino) {
    this.currentScreen = destino;
    if (destino !== "MINIJUEGO_PLUMA") {
      this.juegoPluma = null;
    }
  }

  mostrarPantalla(id) {
    let p = this.pantallas[id];
    if (p.func) p.func();

    if (!this.mostrandoCreditos && p.opciones && p.opciones.length > 0) {
      let xStart = width / 2 - (p.opciones.length * 120) / 2;
      for (let i = 0; i < p.opciones.length; i++) {
        let opt = p.opciones[i];
        this.drawButton(opt.label, xStart + i * 120, height - 80, 100, 40, opt.destino);
      }
    }
  }

  drawButton(label, x, y, w, h, destino) {
    fill(200);
    stroke(0);
    rect(x, y, w, h, 5);
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
    this.listaBotones.push({ x, y, w, h, destino });
  }

  pantalla1() {
    image(this.imagenes[0], 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(245, 245, 220);
    text("EL JUICIO DE LAS ALMAS", width / 2, height / 2);
  }

  pantalla2() {
    image(this.imagenes[1], 0, 0, width, height);
    textAlign(CENTER, TOP);
    textSize(28);
    fill(245, 245, 220);
    text("Te encuentras con el Dios Anubis", width / 2, 100);
    textSize(15);
    text(
      "Su mirada brilla en la penumbra.\n" +
      "Has muerto... tu alma será pesada contra la pluma de Maat.\n" +
      "Antes, debes decidir cómo llegarás a la sala del juicio.",
      width / 2 - 250, 160, 500, 200
    );
  }

  pantalla3() {
    image(this.imagenes[2], 0, 0, width, height);
    textSize(28);
    fill(245, 245, 220);
    textAlign(CENTER, TOP);
    text("Elige tu camino", width / 2, 100);
  }
  
  pantalla4() {
    image(this.imagenes[3], 0, 0, width, height);
    textSize(26);
    fill(245, 245, 220);
    textAlign(CENTER, TOP);
    text("Llegan a una gran sala dorada", width/2, 100);
  }

  pantalla4A() {
    image(this.imagenes[6], 0, 0, width, height);
    textSize(26);
    fill(245, 245, 220);
    textAlign(CENTER, TOP);
    text("En el pasillo te encontras con un cofre", width/2, 100);
  }

  pantalla5A() {
    image(this.imagenes[7], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Adentro hay un amuleto con la forma de chacal.", width/2, height/2);
  }

  pantalla6A() {
    image(this.imagenes[9], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Anubis te mira y dice mostraste valentía.", width/2, height/2);
  }

  pantalla4B() {
    image(this.imagenes[8], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Las sombras se vuelven densas...\nEl piso se abre bajo tus pies.", width/2, height/2);
  }

  pantalla5B() {
    image(this.imagenes[10], 0, 0, width, height);
    textSize(16);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Caes en un río ardiente.\nVoces condenadas te rodean.\nTu alma queda atrapada eternamente en el fuego.", width/2, height/2);
  }

  pantalla5() {
    image(this.imagenes[4], 0, 0, width, height);
    fill(245, 245, 220);
    textSize(20);
    textAlign(CENTER, TOP);
    text(
      "Anubis coloca tu corazón en la balanza.\n" +
      "¿Aceptarás el juicio en silencio o intentarás defender tus actos?",
      width / 2 - 250, 120, 500, 200
    );
  }

  pantalla6() {
    image(this.imagenes[4], 0, 0, width, height);
    fill(245, 245, 220);
    textSize(20);
    textAlign(CENTER, TOP);
    text("Tu corazón se equilibra con la pluma de Maat.\nViviste con justicia.", width/2 - 250, 135, 500, 200 );
  }

  pantalla7() {
    image(this.imagenes[5], 0, 0, width, height);
    fill(0);
    textAlign(CENTER, TOP);
    textSize(25);
    text(
      "Accedes al Paraíso de los Juncos, el campo eterno de la paz.\n" +
      "¡Felicidades!",
      width / 2 - 250, 120, 500, 200
    );
  }

  pantalla5C() {
    image(this.imagenes[4], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Tu voz hace vibrar la balanza...\nEl corazón se vuelve pesado.", width/2, height/2);
  }

  pantalla6C() {
    image(this.imagenes[13], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Sientes una presencia en la oscuridad.", width/2, height/2);
  }

  pantalla7C() {
    image(this.imagenes[11], 0, 0, width, height);
    textSize(20);
    fill(245, 245, 220);
    textAlign(CENTER, CENTER);
    text("Ammit te devora. Tu existencia desaparece.", width/2, height/2);
  }

  pantallaCreditos() {
    this.mostrandoCreditos = true;
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    this.yCreditos -= 2;

    if (this.yCreditos < -300) {
      this.mostrandoCreditos = false;
      this.yCreditos = height + 200;
      this.cambiarPantalla("1");
      return;
    }
    text("CRÉDITOS", width / 2, this.yCreditos);
    textSize(20);
    text("Hecho por Alan Giammarco y Grecia Weber", width / 2, this.yCreditos + 60);
    text("¡Muchas gracias!", width / 2, this.yCreditos + 120);
  }
}

class JuegoPluma {
  constructor(sistema, imgPluma) {
    this.sistema = sistema;
    this.plumaImg = imgPluma;

    this.pluma = new Pluma(this.plumaImg);
    this.temporizador = new Temporizador(30000);
    this.contador = new Contador(3);

    this.perdio = false;
    this.gano = false;
    
    this.estadoFinalizado = false;
    this.tiempoEspera = 0;
  }

  mostrar() {
    image(this.sistema.imagenes[12], 0, 0, width, height);

    if (!this.gano && !this.perdio) {
      if (this.temporizador.terminado() && !this.contador.completado()) {
        this.perdio = true;
        this.tiempoEspera = frameCount;
      } else if (this.contador.completado()) {
        this.gano = true;
        this.tiempoEspera = frameCount;
      }
    }

    if (!this.gano && !this.perdio) {
      fill(255);
      textAlign(CENTER, TOP);
      textSize(20);
      text("¡La pluma de Maat salió volando!\nTócala 3 veces antes de que pasen 30 segundos.", width / 2, 30);

      this.pluma.mostrar();

      let segundos = int(this.temporizador.restante() / 1000);
      textSize(18);
      text("Tiempo: " + segundos, width / 2, height - 60);
      text("Toques: " + this.contador.valor + " / 3", width / 2, height - 40);
    } else if (this.gano) {
      this.mostrarPantallaFin(true);
    } else if (this.perdio) {
      this.mostrarPantallaFin(false);
    }
  }

  mostrarPantallaFin(esVictoria) {
    if (this.estadoFinalizado) return;

    fill(0, 180);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);

    if (esVictoria) {
      text("¡Recuperaste la pluma!\nHas demostrado tu pureza.", width / 2, height / 2);
      
      if (frameCount - this.tiempoEspera > 120) {
        this.estadoFinalizado = true;
        this.sistema.cambiarPantalla("6");
      }
    } else {
      text("No lograste recuperar la pluma a tiempo.\nTu alma cae en el río ardiente...", width / 2, height / 2);
      
      this.sistema.drawButton("Reintentar", width / 2 - 50, height - 100, 100, 40, "MINIJUEGO_PLUMA");

      if (frameCount - this.tiempoEspera > 240) {
        this.estadoFinalizado = true;
        this.sistema.cambiarPantalla("5B");
      }
    }
  }

  click(px, py) {
    if (this.perdio || this.gano) return;

    if (this.pluma.tocada(px, py)) {
      this.contador.incrementar();
      this.pluma.resetPosicion();
    }
  }
}

class Pluma {
  constructor(img) {
    this.plumaImg = img;
    this.tam = 60;
    this.resetPosicion();
    this.vx = random(-6, 6);
    this.vy = random(-5, 5);
  }
  
  resetPosicion() {
    this.x = random(100, width - 100);
    this.y = random(100, height - 150);
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 50 || this.x > width - 50) {
      this.vx *= -1;
      this.x = constrain(this.x, 50, width - 50);
    }
    if (this.y < 50 || this.y > height - 50) {
      this.vy *= -1;
      this.y = constrain(this.y, 50, height - 50);
    }
  }

  mostrar() {
    this.mover();
    push();
    imageMode(CENTER);
    if (this.plumaImg) {
      image(this.plumaImg, this.x, this.y, this.tam, this.tam);
    } else {
      fill(255, 255, 0);
      noStroke();
      ellipse(this.x, this.y, this.tam);
    }
    pop();
  }

  tocada(px, py) {
    return dist(px, py, this.x, this.y) < this.tam / 2;
  }
}

class Temporizador {
  constructor(duracion) {
    this.duracion = duracion;
    this.inicio = millis();
  }

  restante() {
    let t = this.duracion - (millis() - this.inicio);
    return max(0, t);
  }

  terminado() {
    return this.restante() === 0;
  }
}

class Contador {
  constructor(meta) {
    this.meta = meta;
    this.valor = 0;
  }

  incrementar() {
    this.valor++;
  }

  completado() {
    return this.valor >= this.meta;
  }
}
