/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

 


/**
Description of preload
*/

let squareXY = {}
let numberSquares = 0
let numClicks = 0
let isClicked = false
let xTurn = true

function preload() {
  

}


/**
Description of setup
*/
function setup() {
    createCanvas(500,500)
    frameRate(10);
    rectMode(CENTER)
    background("beige")
}

function mousePressed() {
  isClicked = true
  numClicks++
  
  let mouseCoordinates = getMouseXY()
  
  drawText(mouseCoordinates[0], mouseCoordinates[1])

}

function drawText(mouseCoorX, mouseCoorY){
    let clickX = mouseX
    let clickY = mouseY
    let symbol = ''
   
    //get length of object from: https://stackoverflow.com/questions/5223/length-of-a-javascript-object
    for (let i = 0 ; i < numberSquares; i++) {
        if(clickX > squareXY[i][0] && clickX < squareXY[i+1][0] ){
            console.log('x position:', clickX )
            console.log('x postion curennt', squareXY[i][0] )
            console.log('x postion after', squareXY[i+1][0] )
            
           // if(clickX - squareXY[i][0] < clickX - squareXY[i + 1][0] ){
               
              
         
        }
       // console.log(`${i}: ${squareXY[i][0]}`);
       
      }

    if(numClicks % 2 === 0){
         symbol = 'x'
    } else {
        symbol = 'o'
    }

    text(symbol,mouseCoorX, mouseCoorY );
 
   
    
}

function getMouseXY(){
   
    return [mouseX, mouseY]
}

function getSquareXY(x, y){
   
//stores the x and y coordinates of the each square in the object squareXY

    if(numberSquares <= 8){
        squareXY[numberSquares] = [x, y];
        point(squareXY[numberSquares][0], squareXY[numberSquares][1])
 
    numberSquares++
}
}

function drawGrid(){
    //draws a 3 by 3 grid

     let xSquare = 0 
     let ySquare = 0
    for(let j = 0; j < 3; j++){
        //draws rows
        for(let i = 0 ; i < 3; i++){
            //draws square 
            
            rect(xSquare+ (width/3)/2, ySquare +(height/3)/2, width/3, height/3)
            getSquareXY(xSquare+ (width/3)/2, ySquare +(height/3)/2)
            
            //to draw the next square 
            xSquare += width/3
          }
          
          //to draw the next row 
          xSquare = 0
          ySquare += height/3
    }
    
}


/**
Description of draw()
*/
function draw() {
 let xyMouse
    drawGrid()
    
    if(isClicked){
      //  xyMouse = getMouseXY()
      //  mouseCoorX = xyMouse[0]
      //  xyMouse[1] = mouseCoorY
        drawText(mouseCoorX, mouseCoorY)
     }

     isClicked = false

  
   
  
   

   // fill(255, 60, 100);
   // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
   // stroke(0);
  //  noFill();
  

}