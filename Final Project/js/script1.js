class MySketch {
  constructor() {
    this.canvas = createCanvas(400, 400);
    this.canvas.mouseClicked(this.handleClick.bind(this));
  }

  handleClick() {
    // Get the pixel position of the mouse click
    let x = mouseX;
    let y = mouseY;

    // Get the pixel color at the clicked position
    let pixelColor = get(x, y);
    console.log(pixelColor);
  }

  draw() {
    // Draw your sketch
  }
}


 
function setup() {
  let mySketch = new MySketch();

//startGame = new gameBlocks()


}


//if 
function draw() {

 
 
   
  
  
  
}