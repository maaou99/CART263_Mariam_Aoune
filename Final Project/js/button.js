let buttonColor;
let isButtonHovered = false;

function setup() {
    createCanvas(400, 400);
    buttonColor = color(200, 100, 0);
    button = createButton('Take a picture!');
    button.style('width', '250px');
    button.style('height', '50px');
    button.style('background-color', buttonColor);
    button.style('color', '#fff');
    button.style('border', 'none');
    button.style('padding', '10px 20px');
    button.style('font-size', '24px');
    button.style('border-radius', '10px');
    button.style('border', '3px solid #0E272D');
    button.mouseOver(changeCursor);
    button.mouseOut(resetCursor);
    button.mousePressed(changeColor);
}

function draw() {
    if (isButtonHovered) {
        button.style('background-image', 'linear-gradient(#3A8F4C, #79BC8C)');
    } else {
        button.style('background-image', 'linear-gradient(#3A838F, #79BCBA)');
        button.style('border', '3px solid #0E2D1F');
  }
}

function changeCursor() {
    cursor('pointer');
    isButtonHovered = true;
}

function resetCursor() {
    cursor(ARROW);
    isButtonHovered = false;
}

function changeColor() {
    buttonColor = color(0, 100, 200);
    button.style('background-color', buttonColor);
}
