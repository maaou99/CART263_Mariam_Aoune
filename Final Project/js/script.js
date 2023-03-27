/**
Title of Project: Building Blocks 
Author Name: Mariam Aoune & Maloney Khim

 
*/

"use strict";

/*improvemnts
- allow user to press a key when they are ready to take a picture
-use blocks of different color */


let pictureTaken = false 
let  webcamCapture
let startGame 
let finalImage

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  webcamCapture = new WebCam();
  startGame = new Game();
  startGame.drawfood()
  webcamCapture.setup();


}


//if 
function draw() {

  webcamCapture.main()
}


class Game {
 //limit the clickable area
  constructor() {
    this.canvas = createCanvas(400, 400);
    this.canvas.mouseClicked(this.handleClick.bind(this));
    this.tolerance = 150;
    this.colorToMatch = color(255,0,0)
    this.counter = 0
  }

  handleClick() {
     //chatGPT, "get pixel color  after mouse click in p5.js in a class", march 25th
    if(pictureTaken){
   
        // Get the pixel position of the mouse click
      let x = mouseX;
      let y = mouseY;

      let regionX = width / 2 - 400 / 2;
      let regionY = height / 2 - 400 / 2;

      //this.getClickableArea()
    //"delimit the clickable area to a rectangular region in the middle of the screen", chatGPT march 
    if(x > regionX && x < regionX + 400 && y > regionY && y < regionY + 400){
       console.log('clickable area')
       // Get the pixel color at the clicked position
       let pixelColor = get(x, y);

       this.checkColor(pixelColor, this.colorToMatch.levels) 

    } else {
      console.log('non clickable area')
    }

    //code for drag and drop food


    this.dragDropFood()

 

    }
  
  }

  dragDropFood()

  checkColor(currentPixels, matchingPixels){
    
      let r = currentPixels[0];
      let g = currentPixels[1];
      let b = currentPixels[2];

      let matchR =  matchingPixels[0];
      let matchG =  matchingPixels[1];
      let matchB =  matchingPixels[2];

      if (r >= matchR-this.tolerance && r <= matchR+this.tolerance &&
        g >= matchG-this.tolerance && g <= matchG+this.tolerance &&
        b >= matchB-this.tolerance && b <= matchB+this.tolerance) {

        // send back the x/y location immediately
        // (faster, since we stop the loop)
      
        this.counter++

        this.displayCounter()
 
     // console.log("color to match", this.colorToMatch.levels)

  }
  }

  displayCounter(){
    fill('white')
    noStroke()
    rect(80,60,90,60)
    fill('black')
    text(`Counter: ${this.counter}`, 50, 60)
    

  }

  drawfood(){

    
  }


}


class WebCam {

  //chatGPT, "take a picture after clicking on a button in p5.js class", march 25th
  //'live capture to be taken", https://editor.p5js.org/son/sketches/LuJ2eGf9p
    constructor() {

      this.capture = null;
      this.canvas = null;
      this.image = null;
      this.button
      this.startGame
  
    }

    setup() {
      this.canvas = createCanvas(windowWidth, windowHeight);
      this.capture = createCapture(VIDEO);
      this.capture.size(windowWidth, windowHeight); //change the size to 320 x 240
      this.capture.hide();
      this.button = createButton('Take Picture');
      this.button.position(windowWidth-100, windowHeight-100);
    this.button.mousePressed(() => {
      this.takePicture();
    });
    }

    takePicture() {
      pictureTaken = true 
      finalImage = image(this.capture, 0, 0, windowWidth, windowHeight); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
    
      this.capture.remove()
      this.button.remove()
 

    }
 

main(){

  // Draw the video
  if(!pictureTaken){
    image(this.capture, 0, 0,windowWidth, windowHeight);
   
   } else {
    
   }
  
  this.drawPlaceHolder()

}
  
   drawPlaceHolder(){

     // Draw a box on top of the video
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill()
    rectMode(CENTER)
    rect(width/2, height/2, 400, 400, );

   }

}






