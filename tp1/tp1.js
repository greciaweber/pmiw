// Grecia Weber 119170/0 
// Link al video de YouTube https://youtu.be/6wLEhC0vtlM
// TRABAJO PRÁCTICO N°1 - "OpArt con Funciones y Ciclo For en p5-js"
// COMISIÓN 3 - 2025 

let obra;
let colores;
let maxSize = 395; 
let numCircles = 14; 
let centerX, centerY;

function setup() {
  obra = loadImage('assets/leparc.jpg');  
  createCanvas(800, 400);
  noStroke();

  colores = [
    color(0, 100, 0),      
    color(0, 50, 0),       
    color(0, 0, 100),      
    color(100, 0, 100),    
    color(100, 0, 0),      
    color(255, 0, 0),      
    color(255, 150, 0),    
    color(255, 200, 0),    
    color(255, 255, 0),    
    color(0, 255, 0),      
    color(0, 200, 0),      
    color(0, 100, 0),      
    color(0, 100, 100),    
    color(0, 255, 255)
  ];
  
  obra.resize(width / 2, height);  
  
  centerX = width / 2 + 200; 
  centerY = height / 2; 
  background(255);  
  image(obra, 0, 0);  
}

function draw() {
  background(255);  
  image(obra, 0, 0);  
  drawInteractivePattern();  
}

function drawInteractivePattern() {
  for (let i = 0; i < numCircles; i++) {
    let size = calculateCircleSize(i);
    fill(colores[i % colores.length]); 
    ellipse(centerX, centerY, size, size); 
  }
}

function mouseMoved() {
  for (let i = numCircles - 1; i >= 0; i--) {
    let size = calculateCircleSize(i);
    if (dist(mouseX, mouseY, centerX, centerY) < size / 2) {
      colores[i] = color(random(255), random(255), random(255));  
      break; 
    }
  }
  redraw();  
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    colores = [
      color(0, 100, 0),      
      color(0, 50, 0),       
      color(0, 0, 100),      
      color(100, 0, 100),    
      color(100, 0, 0),      
      color(255, 0, 0),      
      color(255, 150, 0),    
      color(255, 200, 0),    
      color(255, 255, 0),    
      color(0, 255, 0),      
      color(0, 200, 0),      
      color(0, 100, 0),      
      color(0, 100, 100),    
      color(0, 255, 255)
    ];
    redraw();  
  }
}

function calculateCircleSize(index) {
  return maxSize - index * (maxSize / (numCircles - 1));
}
