/**
Title of Project: Building Blocks 
Author Name: Mariam Aoune & Maloney Khim

 
*/

"use strict";


let video;
let button;

let capture;
let pictureTaken = false 

let startGame 

//function setup() {
//  createCanvas(640, 480);
//  capture = createCapture(VIDEO);
 // capture.hide();
//}

//function draw() {
  // Draw the video
 // image(capture, 0, 0, 640, 480);

  // Draw a box on top of the video
 // stroke(255, 0, 0);
 // strokeWeight(2);
 /// noFill();
 // rect(100, 100, 200, 200);
//}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  background(51);

//startGame = new gameBlocks()
  capture = createCapture(VIDEO);
 capture.hide();
  //video = createCapture(VIDEO); //access live webcam
  capture.size(windowWidth, windowHeight); //change the size to 320 x 240
  
  
  
  button = createButton('snap'); //create a button called "snap"
  
  button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"

}

function takesnap() {
    pictureTaken = true 
   let img = image(capture, 0, 0, windowWidth, windowHeight); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
  
   capture.remove()
    button.remove()
   
}



function draw() {
   
   // Draw the video
   if(!pictureTaken){
    image(capture, 0, 0,windowWidth, windowHeight);
   
   } else {
      loadPixels()
   }
  
  
   // Draw a box on top of the video
   stroke(255, 0, 0);
   strokeWeight(2);
   noFill()
   rectMode(CENTER)
   rect(width/2, height/2, 200, 200, );
 
  //image(video, 0, 0); 
  
  
  
}


class gameBlocks {
    constructor(randomSize, x, y) {


    }



}

