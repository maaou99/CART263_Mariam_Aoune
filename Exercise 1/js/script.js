/**
Title of Project: Tic Tac Toe game CART263
Author Name: Mariam Aoune

 
*/

"use strict";
 
let squareXY = {} //center point of each square
let numberSquares = 0
let numClicks = 0
let startGame = false
let squareContains = [false, false, false, false, false, false, false, false, false] //all squares are empty
let hasWon = false 


function preload() {


}


/**
Description of setup
*/
function setup() {

    createCanvas(500, 500)
    frameRate(10);
    rectMode(CENTER)
    background("beige")
}

function drawGrid() {
    //draws a 3 by 3 grid

    //x positon of the center of the square
    let xSquare = 0 

    //x positon of the center of the square
    let ySquare = 0

    for (let j = 0; j < 3; j++) {
        //draws rows
        for (let i = 0; i < 3; i++) {
            //draws square 

            rect(xSquare + (width / 3) / 2, ySquare + (height / 3) / 2, width / 3, height / 3)
            
            //stores the center point of square 
            getSquareXY(xSquare + (width / 3) / 2, ySquare + (height / 3) / 2)

            //to draw the next square 
            xSquare += width / 3
        }

        //to draw the next row 
        xSquare = 0
        ySquare += height / 3
    }

}


function getSquareXY(x, y) {

    //stores the x and y coordinates of the each square in the object squareXY
    // an new key/value is stored each time the number of squares increases

    if (numberSquares <= 8) {
        squareXY[numberSquares] = [x, y];
        numberSquares++
    }
}



function playGame(mouseCoorX, mouseCoorY) {

    //main function
 
    let symbol = ''
    // let interval = []

    if (numClicks % 2 === 0) {
        
    //allows X or O depending of the number of clicks is an odd or even number
        symbol = 'x'

    } else {
        symbol = 'o'

    }


    //returns the x position of the symbol
    let xCenter = getCenter(0)

    //returns the y position of the symbol
    let yCenter = getCenter(1)

    let center = [xCenter, yCenter]

    for (let i = 0; i < numberSquares; i++) {
        //to check if two arrays are equal: https://flexiple.com/javascript/javascript-array-equality/
        if (JSON.stringify(squareXY[i]) == JSON.stringify(center) && !squareContains[i]) {

            //a symbol has not yet been written on the square

            //text styling
            textAlign(CENTER)
            textSize(60)
            fill('black')

            //text is written on canvas
            text(symbol, xCenter, yCenter)
          
             
            //to remove a value from a object: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
            squareContains[i] = symbol //data (x or o) is saved 
        }
    }
    console.log(squareContains)
    checkSquare()

}

function getCenter(axe) {
    //find a central point that is closest to mouseX or mouseY
   
    let greater, lesser, click

    if (!axe) {
        
        //axe is 0
         //to get the desired x positon of symbol
        click = mouseX
    } else {
        //axe is 1
        //to get the desired y positon of symbol
        click = mouseY
    }

    //returns whiich center position is closest to the mouseX or mouseY value
    //ex: if mouseX is 220, the x position of the symbol will be 250

    if (click < width && click > squareXY[numberSquares - 1][axe]) {

        greater = squareXY[numberSquares - 1][axe]
        return greater

    }

    else if (click > 0 && click < squareXY[0][axe]) {

        lesser = squareXY[0][axe]
        return lesser
    }

    else if (Math.abs(click - squareXY[0][axe]) < Math.abs(click - squareXY[numberSquares - 1][axe])) {

        greater = squareXY[0][axe]
        lesser = width / 2

        if (Math.abs(click - squareXY[0][axe]) < Math.abs(click - width / 2)) {
            return greater

        } else {
            return lesser

        }

    } else {

        greater = width / 2
        lesser = squareXY[numberSquares - 1][axe]

        if (Math.abs(click - width / 2) < Math.abs(click - squareXY[numberSquares - 1][axe])) {

            return greater

        } else {
            return lesser
        }
    }

}

function checkSquare() {

    //saves all symbols of same type (x or o) into one array
 
    //array of x's that have appeared on the grid
    let indexX = [] 

    //array of o's that have appeared on the grid
    let indexO = []

    for (let i = 0; i < squareContains.length; i++) {
        if (squareContains[i] === 'o') {
            //adds the index where the symbol x is
            //ex: if there is a x on the 3rd grid then the number 3 is added to indexX
            indexX.push(i)

        } else if (squareContains[i] === 'x') {
            //adds the index where the symbol o is
            indexO.push(i)
        }

        if (indexX.length >= 3) {
            //at least three symbols of the same type exist 
            checkCombination(indexX, 'x')
        } else if (indexO.length >= 3) {

            checkCombination(indexO, 'o')
        }
    }
}

function checkCombination(arr, str) {

    // add 1 to each element of the array to match the combinations
    // start counting the combinations from 1 (ex: the top left corner square is 1)

    //stores at which square a symbol is present
    let incrementArray = arr.map(function (number) {
        return number + 1;
    });

    //which combination of three squares allows player to win
    //ex: if the 4th, 5th, and 6th square all have the symbol x, one of the players has won
    let possibleCombinations = ['123', '456', '789', '147', '258', '369', '789', '159', '357']

    for (let i = 0; i < possibleCombinations.length; i++) {
        //returns a possible combination in form of an array
        let splitedCombination = splitArray(possibleCombinations[i])
        
        let validCombination = []

        for (let i = 0; i < incrementArray.length; i++) {

            if (splitedCombination.includes(incrementArray[i])) {
                //checks if the index matches an element of splitedCombination
                validCombination.push(true)

            };
        }
   
        checkWinner(validCombination, str)
    }

}



function splitArray(arrElement) {

    //the split method: https://www.w3schools.com/jsref/jsref_split.asp
    let newArr = arrElement.split(",").map(Number);
    let num = newArr[0];

    // How to Split a Number into an Array in JavaScript: https://codingbeautydev.com/blog/javascript-split-number-into-array/
    let numArray = Array.from(num.toString()).map(Number);

    return numArray

}




function checkWinner(arr, symbol) {

    //makes text appears when a player has won


    let intervalIDP2,  intervalIDP1
    hasWon = true

    if (arr.length === 3 && hasWon) {
        if (symbol === 'x') {
 
           //the text appears after 2 seconds
           intervalIDP2 = setInterval(function () {
                if (hasWon) { appearText('PLAYER 2 HAS WON') }
            }, 2000)
 
        } else if(symbol === 'o') {

            intervalIDP1 =  setInterval(function () {
                if (hasWon) { appearText('PLAYER 1 HAS WON') }
            }, 2000)
        
        }
        
        //the text disappears after two seconds
        setTimeout(function(){
            clearInterval(intervalIDP2)
            clearInterval(intervalIDP1)
         }, 2000);

        //the game restarts after 4 seconds
        setTimeout(restartGame, 4000)

    }

}

function appearText(txt) {
    //stylizing 
    fill('red')
    textSize(20)
    text(txt, 250, 450)
    fill('white')

}


function restartGame() {
    //initializes all values and re draws the grid 
    squareXY = {}
    numberSquares = 0
    numClicks = 0
    startGame = false
    squareContains = [false, false, false, false, false, false, false, false, false]
    hasWon = false
    text(' ', 100, 400)
    drawGrid()

}


/**
Description of draw()
*/
function draw() {
    
    drawGrid()
 
    if (startGame) {
         
        playGame(mouseCoorX, mouseCoorY)
        textSize(32);
      
    }
}


//mouse events

function getMouseXY() {

    return [mouseX, mouseY]
}


function mousePressed() {
    startGame = true
    numClicks++

    let mouseCoordinates = getMouseXY()

    if (numClicks > 1) {

        playGame(mouseCoordinates[0], mouseCoordinates[1])

    }

}