//Sources 
// - gradient : https://youtu.be/-MUOweQ6wac 
// - progress bar : ChatGPT

let progress = 0;
const maxProgress = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");

  // Empty prograss bar
  fill("#BDDBE1");
  rect(50, 50, 300, 30, 20);

  // Fill the gradient progress bar
  let gradient = drawingContext.createLinearGradient(100, 0, 300, 0);
  gradient.addColorStop(0, color("#23D7EE"));
  gradient.addColorStop(1, color("#0063EE"));
  drawingContext.fillStyle = gradient;
  rect(50, 50, progress * 3, 30, 20);

  // Percentage text
  fill("black");
  textAlign(CENTER, CENTER);
  text(`${round(progress / maxProgress * 100)}%`, 200, 65);
  noStroke();

}

function mouseClicked() {
  // Increment progress variable and constrain it to a maximum value of 100
  progress = min(progress + 20, 100);
}
