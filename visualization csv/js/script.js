let table;
let points = [];
let circles = [];

let positionEllispsesX = []
let positionEllispsesY = []


function preload() {
  table = loadTable("masculinity-survey.csv", "csv", "header");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
 

  //font in local folder
  fontRegular = loadFont('assets/fonts/Mynerve-Regular.ttf');
  //sets font
  textFont(fontRegular)
  noStroke()

 
    points = new DataPoint();
 

  // Random Circles with No Overlap by Coding Train, https://editor.p5js.org/Q/sketches/K-n0LVt2D

  // Set the initial value of protection to 0
  var protection = 0;

  // Keep generating circles until there are at least 6 circles
  while (circles.length < 6) {

    // Create a new circle with random x positions, y positions, and radius 
    var circle = {
      x: random(50, width - 50),
      y: random(50, height - 50),
      r: random(45, 60)
    }

    // Check if the new circle overlaps with any previous circles
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y);

      //checking the distance between two circles
      if (d < circle.r + other.r + 10) {
        overlapping = true;
      }
    }

    // If the new circle doesn't overlap with any previous circles, add it to the circles array
    if (!overlapping) {
      circles.push(circle);
    }

    // Check if we've been trying to add circles for too long
    protection++;

    if (protection > 10000) {
      // If we have, break out of the loop to prevent an infinite loop
      break;
    }
  }


}

function draw() {

  //will display the question of the data visual
  points.drawQuestionOrData()


}


class DataPoint {
  constructor() {

    // questions of the data set
    this.questions = table.getColumn(0);

    //when the program starts, the question apears on the screen
    this.showQuestion = true;

    //when the program starts, the data (result) does not appear on the screen
    this.showData = false

    //position of the question in the array this.question
    this.currentTextIndex = 0;

    //knows how long the question has appeard
    this.currentTextDisplayTime = 0;

    //initially, the flashlight is off
    this.flashlightOn = false

    //a button will be used to got to the next question
    this.button;

    //the button has not been created
    this.buttonCreated = false

    //help drawing a line with an angle
    this.lineAngle = random(10, 20)

    //updates how many different types of answers exists for one question
    this.circlesData = []



  }


  drawQuestionOrData() {

    // This function draws either the question or the data, depending on whether
    // this.showQuestion is true or false.

    if (this.showQuestion) {
      // If showQuestion is true, draw the text on a blue background
      background('#395CAA')

      //checks how long the text has appeared for
      this.checkTime()

      //draw the text
      this.textDraw()

    } else {

      // If showQuestion is false, create a new div 
      this.createNewDiv()

      //draw the flashlight
      this.drawFlashlight()
    }
  }



  textDraw() {

    //styling and postionning the text
    fill('white')
    noStroke()
    textSize(15)
    textAlign(CENTER, CENTER)

    //saving the current question 
    let string = this.questions[this.currentTextIndex]

    //cut one line into two lines to prevent line being longer then the width in p5.js, chatGPT, March 5th 2023

    // measure the width of the string
    let lineWidth = textWidth(string);

    // check if the line is longer than the width of the canvas
    if (lineWidth > width) {

      // find the middle of the string
      let mid = string.length / 2;

      // extract the left half of the string
      let left = string.slice(0, mid);

      // extract the right half of the string
      let right = string.slice(mid);

      // draw the left half of the string on the first line
      text(left, width / 2, height / 2 - 20);

      // draw the right half of the string on the second line
      text(right, width / 2 , height / 2 + 10);

    } else {

      // draw the whole string on one line
      text(string, width / 2, height / 2);

    }
  }


  checkTime() {


    //Chat gpt, "iterate through an array and display each text element in the array for 5 seconds if the boolean is true in p5.js in a class", 27th of Febuary 2023

    // Increment the display time
    this.currentTextDisplayTime++;

    if (this.currentTextDisplayTime >= frameRate() && this.showQuestion) {
      // If 5 seconds has not passed, keep showing the same text but in a different index

      //increments the currentTextIndex variable to move to the next text element in the array
      this.currentTextIndex++;

      //restarts the timer
      this.currentTextDisplayTime = 0;

    } else if (this.questions[this.currentTextIndex] === '' || !this.questions[this.currentTextIndex]) {
      //If the current text element is an empty string or if it does not exist

      //the question stops appearing 
      this.showQuestion = false

      //the flashlight turns on
      this.flashlightOn = true
    }
  }


  createNewDiv() {

    // creates a new div element and adds it to the main element 
    //if a div element with the id of flashlight does not already exist

    if (!document.getElementById('flashlight')) {
      //there is no element with the id flashlight

      //find the main html tag element
      const mainElement = document.querySelector('main');

      //create a new div element
      const newDivElement = document.createElement('div');

      // Set the text content of the new div element
      mainElement.setAttribute('id', 'flashlight');

      // Add the new div element to the main element
      mainElement.appendChild(newDivElement);

    }

    this.getMousePositions()

  }

  drawFlashlight() {

    // "How to select CSS pseudo element using javaScript", https://www.youtube.com/watch?v=LszEboGO_zw&ab_channel=insideTheDiv

    //implementation of a flashlight effect on a webpage

    //gets a reference to the div element with the id "flashlight" 
    let flashlightDiv = document.getElementById('flashlight')

    if (!this.showQuestion) {

      //this.showQuestion is false
      //detects mouse move and then calls the drawData() function
      flashlightDiv.addEventListener('mousemove', this.drawData());

    }

    //access the CSS properties of the ::before element
    //to modify the visual appearance of the flashlight effect
    window.getComputedStyle(flashlightDiv, '::before')

    //define the radial gradient for the flashlight effect
    //variables --Xpos and --Ypos determine the position of the center of the gradient 
    //rgba(0,0,0,1) to define the color
    flashlightDiv.style.setProperty("--colorBackground", `radial-gradient(
  circle 5em at var(--Xpos)var(--Ypos),
  rgba(0, 0, 0, 0), rgb(0, 0, 0,1)
)` )

  }

  showButton() {

    //source: ChatGPT, "run a function when a button is clicked in p5.js  in a class using createButton()", March 1st 2023

    // creates and positions a button object on a webpage
    this.button = createButton('Next');

    //sets the id of the button to "next"
    this.button.id('next')


    // Position the button
    this.button.position(windowWidth - 70, windowHeight - 40);



    // Set the size of the button
    this.button.size(50, 20);

    //indicates that the button has been created
    this.buttonCreated = true



  }

  drawData() {

    if (!this.buttonCreated) {

      //the button has not been created yet

      //calls the showButton() function to create and position the button
      this.showButton()

    }

    //sets an event listener for when the button is clicked
    this.button.mousePressed(this.nextQuestion.bind(this));

    for (let i = 0; i < table.getRowCount(); i++) {
      //iterates over a table 

      //checks if the value in the first column of the current row of the table matches the current question 
      if (table.getString(i, 0) === this.questions[this.currentTextIndex - 1]) {

        background('#395CAA')

        //calculate the number of circles to be drawn for the current question
        this.getNumberOfCircles(i, this.circlesData,)

        for (let j = 0; j < this.circlesData.length; j++) {

          //get which row the answer is found
          let row = this.getPositionAnswer(j)

          //convert the answer string to a number
          let finalNumber = this.stringToNumber(table.getString(row, 2), j)

          fill('orange')

          ellipse(circles[j].x, circles[j].y, circles[j].r * 2, circles[j].r * 2);

          //draw lines in the circle
          this.drawLines(j, finalNumber)

          //draw the answer on the circle
          this.drawTextAnswer(row, j)



        }
      }
    }
  }

  getPositionAnswer(index) {
    //finds the row where the answer is located

    let indexText = (this.currentTextIndex - this.circlesData.length) + index

    if ((this.currentTextIndex - 5) + index === table.getRowCount()) {
      //the current position of the text is equal to number of rows in the table 


      //remove button to signify the end of the program
      this.button.remove()

      indexText = (indexText - this.circlesData.length) - 1
      return indexText


    }  else if (table.getString(indexText, 1) === '') {

      //updates the row number if the program is at the last question
      indexText = (indexText - this.circlesData.length)

    }

    //returns row number
    return indexText
  }



  stringToNumber(string) {

    //'find a number in a string and convert it to a number', chat gpt, march 2nd 2023

    //takes a string as an input and extracts
    //the first occurrence of a sequence of one 
    //or more digits using a regular expression

    const numInStr = string.match(/\d+/g)

    //grabs the element at index 0

    let numInDecimal = 0

    if (numInStr != null) {
      //if we find a number

      //converts the extracted string into a decimal number by dividing the integer value by 100
      numInDecimal = parseInt(numInStr[0]) / 100

    }

    //returns the final number
    return numInDecimal

  }


  getNumberOfCircles(index, arr) {
    //lets us know how many possible answers a question has

    //If the index is not already present in the array, it is added to the array

    if (!arr.includes(index)) {
      //the value of the index is not present in the array
      this.circlesData = arr
      //add the value index to the array
      arr.push(index)

    }

    //returns the number of circles
    return index

  }

  drawLines(index, linesRatio) {

   //draw a 5 lines with different angle rotations in a circle with p5.js in a class, chatGPT, March 3rd 2023

    //calculate the angle of rotation for the lines
    this.getAngle()

    //number of lines to draw is calculated based on the linesRatio
    strokeWeight(0.2 + linesRatio);

    let c = color(227, 78, 156, 130);

    stroke(c);

    let numberOfLines = 150 * linesRatio

    for (let i = 0; i < numberOfLines; i++) {

      let angle = TWO_PI * this.lineAngle * i / 5;

      //cos() and sin() functions are used to calculate the x and y coordinates for each end of the line

      let x1 = circles[index].x + circles[index].r * cos(angle);
      let y1 = circles[index].y + circles[index].r * sin(angle);
      let x2 = circles[index].x + circles[index].r * cos(angle + radians(36 * i));
      let y2 = circles[index].y + circles[index].r * sin(angle + radians(36 * i));


      line(x1, y1, x2, y2);

    }
  }

  getAngle() {
    // This function returns a random angle in radians,
    let angle = TWO_PI * random(10, 20) / 5;
    return angle
  }

  drawTextAnswer(number, index) {

    //retrieve data from a table and concatenate it to a string
    let string = table.getString(number, 1) + ": " + table.getString(number, 2)

    fill('#2D3251')

    //the size of the font is propotional to the size of the circle
    textSize(circles[index].r / 7.5)

//draws text in the middle of the circle
    text(string, circles[index].x, circles[index].y)

  }

  nextQuestion() {
    //resets the program after clicking button and goes to the next question

    //shows a question
    this.showQuestion = true

    //empties the array to welcome a new set of circles
    this.circlesData = []

    //the flashlight is off
    this.flashlightOn = false

    //remove the html element of the flashlight
    this.removeFlashlight()

    //passes on to the next question
    this.currentTextIndex++

    //the answers are not shown
    this.showData = false

    //prevent constantly creating buttons
    this.buttonCreated = false

    //remove the button
    this.button.remove()


  }

  removeFlashlight() {
    //removes the flashlight effect from the HTML document

    let flashlightDiv = document.getElementById('flashlight')

    //setting the background color of the flashlight element to transparent
    flashlightDiv.style.setProperty("--colorBackground", "transparent")


  }

  getMousePositions() {

    //gets the current position of the mouse on the screen and updates the position of a flashlight

    //retrieves the flashlight element from the HTML document
    let flashlight = document.getElementById('flashlight')
    flashlight = document.getElementById('flashlight')

    // set the value of the CSS variables --Xpos and --Ypos to the corresponding pixel positions of the mouse
    flashlight.style.setProperty("--Xpos", mouseX + "px")
    flashlight.style.setProperty("--Ypos", mouseY + "px")

  }
}

