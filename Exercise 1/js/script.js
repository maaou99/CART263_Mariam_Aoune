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
let square = [true, true, true, true, true ,true, true, true, true]

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

function mouseClicked() {
  isClicked = true
  numClicks++
  
  let mouseCoordinates = getMouseXY()
  
  if(numClicks > 1){
    drawText(mouseCoordinates[0], mouseCoordinates[1])
}

}

function getCenter(axe){

    let greater,lesser, click

if(!axe){
    click = mouseX
} else {
    click = mouseY
}
   

    if(click < width && click > squareXY[numberSquares-1][axe]){
        console.log(click)
      //  lesser = width
        greater = squareXY[numberSquares-1][axe]
        return greater
 
    }

    else if(click > 0 && click< squareXY[0][axe]){
        console.log(click)
        //greater =  0
        lesser  = squareXY[0][axe] 
        return lesser
    } 

    else if( Math.abs(click - squareXY[0][axe]  ) < Math.abs(click -squareXY[numberSquares-1][axe])) {
         console.log(click)
        greater =squareXY[0][axe] 
        lesser  =  width/2

        if(Math.abs(click - squareXY[0][axe]  ) < Math.abs(click - width/2)){
         return greater
         
        } else {
        return lesser
         
        }
       
    } else {
        
        greater = width/2
        lesser  =  squareXY[numberSquares-1][axe]

        if(Math.abs(click - width/2  ) < Math.abs(click - squareXY[numberSquares-1][axe])){
           
            return greater
           
       

        } else {
            return lesser
        } 
        }

}
 

function drawText(mouseCoorX, mouseCoorY){

 
    let clickY = mouseY
    let symbol = ''
   // let interval = []
   
    if(numClicks % 2 === 0){
        symbol = 'x'
   } else {
       symbol = 'o'
   }

    let xCenter = getCenter(0)
    let yCenter = getCenter(1)
    let center = [xCenter, yCenter]
    
    for(let i = 0; i < numberSquares; i++){
        //to check if two arrays are equal: https://flexiple.com/javascript/javascript-array-equality/
        if (JSON.stringify(squareXY[i]) == JSON.stringify(center) && square[i]){
            console.log(squareXY[i])
            text( symbol, xCenter, yCenter )
            //to remove a value from a object: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
            square[i] = false //prevents from drawing text on a square that has been clicked more than once
            
        }    
    }
 
    
         
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
 
    drawGrid()
    
    if(isClicked){
    
      drawText(mouseCoorX, mouseCoorY)
 
     }

     isClicked = false

  
   
  
   

   // fill(255, 60, 100);
   // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
   // stroke(0);
  //  noFill();
  

}