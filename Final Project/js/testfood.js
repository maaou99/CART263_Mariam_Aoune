let foodX;
const radius = 50;
const diameter = radius*2;
let foodMove = false;

function setup(){
    createCanvas(windowWidth, windowHeight);
    foodX = 200
    foodY = 200
}

function draw() {
    background(226, 225, 145);
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill()
    rectMode(CENTER)
    rect(width / 2, height / 2, 400, 400,);
    noStroke();
    fill('blue');
    circle(foodX, foodY, diameter);
}

function mousePressed(){
    let d = dist(mouseX, mouseY, foodX, foodY);
    if(d<radius) {
        foodMove = true;
    } else {
        foodMove = false;
    }
}

function mouseReleased() {
    foodMove = ralse;
}

function mouseDragged() {
    if(foodMove) {
        foodX = mouseX;
        foodY = mouseY;
    }
}
