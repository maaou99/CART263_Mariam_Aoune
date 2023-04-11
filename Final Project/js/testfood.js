// Declare the image variable
let img; 
let leaf1;
let leaf2;
let leaf3;
let leaf4;
let leaf5;
let leaf6;
let leaf7;
let leaf8;
let leaf9;
let leaf10;
let leaf11;
let leaf12;
let vine1;
let vine2;
let vine3;
let vine4;

// Load the image file
function preload() {
    img = loadImage('food.png');
    eye = loadImage('eye.gif');
    // leaf1 = loadImage('leaf1-smoll.gif');
    // leaf2 = loadImage('leaf2-smoll.gif');
    // leaf3 = loadImage('leaf3-smoll.gif');
    // leaf4 = loadImage('leaf4-smoll.gif');
    // leaf5 = loadImage('leaf5-smoll.gif');
    // leaf6 = loadImage('leaf6-smoll.gif');
    // leaf7 = loadImage('leaf7-smoll.gif');
    // leaf8 = loadImage('leaf8-smoll.gif');
    // leaf9 = loadImage('leaf9-smoll.gif');
    // leaf10 = loadImage('leaf10-smoll.gif');
    // leaf11 = loadImage('leaf11-smoll.gif');
    // leaf12 = loadImage('leaf12-smoll.gif');
    // vine1 = loadImage('vine1.png');
    // vine2 = loadImage('vine2-smoll.gif');
    // vine3 = loadImage('vine3.png');
    // vine4 = loadImage('vine4.png');

    // leaf1.resize(windowWidth, windowHeight);
    // leaf2.resize(windowWidth, windowHeight);
  
  
}


//food
let foodX;
const radius = 50;
const diameter = radius * 2;
let foodMove = false;

//progress bar
let progress = 0;
const maxProgress = 100;

// p5.js speech
let speechRec;

//setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    foodX = 200;
    foodY = 200;

    eyeX = 200;
    eyeY = 400;

    speechRec = new p5.SpeechRec('en-US', gotSpeech);
    speechRec.continuous = true;
    speechRec.interimResults = false;
    speechRec.start();

}

function draw() {
    background(226, 225, 145);
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, 400, 400);
    noStroke();
    // fill('blue');
    // circle(foodX, foodY, diameter);

    // // //Display the plant images
    // image(leaf1, 0, 0, leaf1.width, leaf1.height);
    // image(leaf2, 0, 0, leaf2.width, leaf2.height);
    // image(leaf3, 0, 0, leaf3.width, leaf3.height);
    // image(leaf4, 0, 0, leaf4.width, leaf4.height);



    // Display the food image
    image(img, foodX - radius, foodY - radius, diameter, diameter);
    // Display the eye image
    image(eye, eyeX - radius, eyeY - radius, diameter, diameter);


    // Empty progress bar
    fill("#BDDBE1");
    rectMode(CORNER);
    rect(200, 50, 300, 30, 20);

    // Fill the gradient progress bar
    let gradient = drawingContext.createLinearGradient(100, 0, 300, 0);
    gradient.addColorStop(0, color("#23D7EE"));
    gradient.addColorStop(1, color("#0063EE"));
    drawingContext.fillStyle = gradient;
    rect(200, 50, progress * 3, 30, 20);

    // Percentage text
    fill("black");
    textAlign(CENTER, CENTER); // Set text alignment to center
    text(`${round(progress / maxProgress * 100)}%`, 200 + 150, 100); // Modified x-coordinate
    noStroke();

    // Check for speech recognition
    if (speechRec) {
        speechRec.continuous = true;
        speechRec.interimResults = false;
    }

}

function gotSpeech() {
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      console.log(said);
      
      if (said.includes("how are you")) {
        progress = min(progress + 20, 100);
      }
      else if (said.includes("I love you")) {
        progress = min(progress + 20, 100);
      }
      else if (said.includes("you look cool")) {
        progress = min(progress + 20, 100);
      }
      else if (said.includes("good boy")) {
        progress = min(progress + 20, 100);
      }
      
      speechRec.start();
    }
  }
  

function mousePressed() {
    let d = dist(mouseX, mouseY, foodX, foodY);
    if (d < radius) {
        foodMove = true;
    } else {
        foodMove = false;
    }
}

function mouseReleased() {
    foodMove = false;
    if (foodX > width / 2 - 200 && foodX < width / 2 + 200 &&
        foodY > height / 2 - 200 && foodY < height / 2 + 200) {
        progress = min(progress + 20, 100);
    }
}

function mouseDragged() {
    if (foodMove) {
        foodX = mouseX;
        foodY = mouseY;
    }
}
