/**
Title of Project: Build-A-Blocks
Authors Name: Mariam Aoune & Maloney Khim

This games allows the player to build an animal in the physical world and interact with it on their screen 
 
*/

"use strict";

/* Improvements
- allow user to press a key when they are ready to take a picture
-use blocks of different color */

// cursor(), https://p5js.org/reference/#/p5/cursor
// createButton(), https://p5js.org/reference/#/p5/createButton
// text(), https://p5js.org/reference/#/p5/text 
// How to know if an image has been loaded in p5.js , ChatGPT
// Make a draggable object or drag and drop object in p5.js, https://www.youtube.com/watch?v=D_cNsBSgKDA
// Save a p5.js image taken with a webcam and use it as a background image p5.js in a class, ChatGPT
// Loading animation, https://www.youtube.com/watch?v=UWgDKtvnjIU&t=330s&ab_channel=TheCodingTrain
// Loading bar, https://editor.p5js.org/gpetrioli/sketches/SyibBz_ff, ChatGPT
// Speech Recognition, https://editor.p5js.org/dano/sketches/T-XASCOsa, ChatGPT
// Image mode, https://p5js.org/reference/#/p5/imageMode

let pictureTaken = false
let webcamCapture
let startGame
let finalImage
let imageToSave;
let backgroundImage;
let eyeImg, earsImg;
let imgEyeX, imgEyeY; // X & Y position variables of the eye gif
let imgEarsX, imgEarsY // X & Y position variables of the bunny ears image
let imgHatX, imgHatY // X & Y position variables of the top hat image
let imgBowX, imgBowY // X & Y position variables of the bowtie image
let draggingEye = false; // Default dragging status of the eye gif is false, it becomes true if the gif is being dragged
let draggingEars = false // Default dragging status of the bunny ears image is false, it becomes true if the image is being dragged
let draggingHat = false // Default dragging status of the top hat image is false, it becomes true if the image is being dragged
let draggingBow = false // Default dragging status of the bowtie image is false, it becomes true if the image is being dragged
let speechRec; // Declare a variable for the speechRec object
let leaf // Declare a variable to hold the gif of a leaf
let leaf1 // Declare a variable to hold the gif of another leaf
let leaf2 // Declare a variable to hold the gif of yet another leaf
let leaf3 // Declare a variable to hold the gif of yet another leaf
let leaf4 // Declare a variable to hold the gif of yet another leaf
let leaf5 // Declare a variable to hold the gif of yet another leaf
let leaf6 // Declare a variable to hold the gif of yet another leaf
let leaf7 // Declare a variable to hold the gif of yet another leaf
let leaf8 // Declare a variable to hold the gif of yet another leaf
let leaf9 // Declare a variable to hold the gif of yet another leaf
let leaf10 // Declare a variable to hold the gif of yet another leaf
let leaf11 // Declare a variable to hold the gif of yet another leaf
let jungletop // Declare a variable to hold the image of the top of the jungle illustration
let vine // Declare a variable to hold the image of the vine
let vine1 // Declare a variable to hold the gif of another vine
let vine2 // Declare a variable to hold the image yet another vine
let vine3 // Declare a variable to hold the image yet another vine
let egg // Declare a variable to hold the gif of the egg
let hat // Declare a variable to hold the image of the top hat
let bowtie // Declare a variable to hold the image of the bowtie

let loading = true
let loadingBackground
let loadingLightWood

let x
let startAt = 0

function imageloaded() {

  background(loadingBackground) // Make the loading background appear


  textSize(80) // Make the text size 80px
  fill('white') // Make the text color white
  textAlign(CENTER, CENTER) // Align the text in the center of the canvas
  noStroke() // Remove the stroke
  text('Build-A-Blocks', width / 2, height / 2 - 50)
  stroke('green'); // Make the stroke color green
  strokeWeight(20); // Make the stroke weight 20

  //x = map(0, startAt, 0, startAt+50 , 100);


  line(width / 2 - width / 4, height / 2 + height / 6, width / 2 - width / 4 + (startAt * 400), height / 2 + height / 6);
  startAt += 0.1

}


function preload() {
  loadingBackground = loadImage('assets/images/wooden_bck-8.png') // Load the image for the loading page background
  loadingLightWood = loadImage('assets/images/light_wood.png') // Load the image for the wooden circle where the items to decorate the pet are placed




}

function setup() {
  //setting the font, the font is from google fonts
  textFont('Delicious Handrawn')

  //full screen canvas
  createCanvas(width, height);

  //setting the x any postion of the eyes, the ears, the hat and the bow
  imgEyeX = width / 2 + 120;
  imgEyeY = height / 2 + 100;

  imgEarsX = imgEyeX + 200
  imgEarsY = imgEyeY

  imgHatX = imgEyeX
  imgHatY = imgEarsY + 100

  imgBowX = imgEarsX
  imgBowY = imgEarsY + 150

  eyeImg = loadImage('assets/images/eyes(2).gif', imageloaded); // Load the gif of the eye during the setup phase in the imageloaded function
  hat = loadImage('assets/images/hat.png', imageloaded); // Load the image of the top hat during the setup phase in the imageloaded function
  bowtie = loadImage('assets/images/bowtie.png', imageloaded); // Load the image of the bowtie during the setup phase in the imageloaded function
  leaf = loadImage('assets/images/leaf2-smoll.gif', imageloaded) // Load the gif of the leaf2 during the setup phase in the imageloaded function
  egg = loadImage('assets/images/egg.gif') // Load the gif of the egg during the setup phase
  leaf1 = loadImage('assets/images/leaf1-smoll.gif', imageloaded) // Load the gif of the leaf1 during the setup phase in the imageloaded function
  leaf2 = loadImage('assets/images/leaf3-smoll.gif', imageloaded) // Load the gif of the leaf3 during the setup phase in the imageloaded function
  leaf5 = loadImage('assets/images/leaf6-smoll.gif', imageloaded) // Load the gif of the leaf6 during the setup phase in the imageloaded function
  leaf6 = loadImage('assets/images/leaf7-smoll.gif', imageloaded) // Load the gif of the leaf7 during the setup phase in the imageloaded function
  earsImg = loadImage('assets/images/ears.png', imageloaded) // Load the image of the bunny ears during the setup phase in the imageloaded function
  leaf3 = loadImage('assets/images/leaf4-smoll.gif', imageloaded) // Load the gif of the leaf4 during the setup phase in the imageloaded function
  leaf4 = loadImage('assets/images/leaf5-smoll.gif', imageloaded) // Load the gif of the leaf5 during the setup phase in the imageloaded function
  leaf7 = loadImage('assets/images/leaf9-smoll.gif', imageloaded) // Load the gif of the leaf9 during the setup phase in the imageloaded function
  leaf8 = loadImage('assets/images/leaf10-smoll.gif', imageloaded) // Load the gif of the leaf10 during the setup phase in the imageloaded function
  leaf9 = loadImage('assets/images/leaf11-smoll.gif', imageloaded) // Load the gif of the leaf11 during the setup phase in the imageloaded function
  leaf10 = loadImage('assets/images/leaf12-smoll.gif', imageloaded) // Load the gif of the leaf12 during the setup phase in the imageloaded function
  jungletop = loadImage('assets/images/jungle_top.png', imageloaded) // Load the image of the jungle top during the setup phase in the imageloaded function
  vine = loadImage('assets/images/vine1.png', imageloaded) // Load the image of the vine1 during the setup phase in the imageloaded function
  vine1 = loadImage('assets/images/vine2-smoll.gif', imageloaded) // Load the gif of the vine2 during the setup phase in the imageloaded function
  vine2 = loadImage('assets/images/vine3.png', imageloaded) // Load the image of the vine3 during the setup phase in the imageloaded function
  vine3 = loadImage('assets/images/vine4.png', () => // Load the image of the vine4 during the setup phase in the imageloaded function
    loading = false)



  // Instantize the two classes 
  webcamCapture = new WebCam();
  startGame = new Game();


  webcamCapture.setup(); // Sets up the camera 

  speechRec = new p5.SpeechRec('en-US', gotSpeech); // Sets the language code to 'en-US', a function called 'gotSpeech' will be created when speech is being detected
  speechRec.continuous = true; // Sets the continuous property of the speechRec object to true so it will keep listening for speech until the user stops talking
  speechRec.interimResults = false; // Sets the interimResults property of the speechRec object to false so it will only return the final spoken phrase, not just a partial part of the phrase
  speechRec.start(); // Starts the speechRec object listening for speech, when it is detected and transcribed, the gotSpeech function is called



}


function draw() {



  //if the picture has been taken, display the picture 
  webcamCapture.displayScreen();


  //calling the main function in webcam class
  webcamCapture.main()

  //callinf the main function is game class
  startGame.main()

  if (webcamCapture.buttonClicked) {
    //if take picture button is clicked then start countdown
    webcamCapture.countdownTimer()

  }

  if (speechRec) { // If the speech recognition's...
    speechRec.continuous = true; // continous property is true
    speechRec.interimResults = false; // and the interim results property is false...
  }

}

function gotSpeech() { // Declare the function gotSpeech
  //chat GPT, 'p5.js speech recognition
  if (speechRec.resultValue) { // Check if the user said a certain phrase
    let said = speechRec.resultString; // Assigns the transcribed phrase to the 'said' variable

    if (said.includes("how are you")) { // If the user said "How are you?"

      startGame.progress = min(startGame.progress + 20, 100); // The progress bar increases of 20% on a maximum value of 100%
    }
    else if (said.includes("I love you")) { // If the user said "I love you!"
      startGame.progress = min(startGame.progress + 20, 100); // The progress bar increases of 20% on a maximum value of 100%

    }
    else if (said.includes("you look cool")) { // If the user said "You look cool!"
      startGame.progress = min(startGame.progress + 20, 100); // The progress bar increases of 20% on a maximum value of 100%

    }

    startGame.checkProgress() // Calls the checkProgress method to check current level of the progress bar
    speechRec.start(); // The speech recognition starts listening to the user again
  }


}

function mousePressed() {

  if (pictureTaken) {

    // Check if the mouse is clicking on the eye, ears, hat or bow

    //If the mouse click is within the bounding box of the eye image,
    // the draggingEye property is set to true. Similarly, if the mouse
    // click is within the bounding box of the ears, hat, or bowtie, their 
    //respective dragging properties are set to true

    //dragging properties are used to track whether the user is currently 
    //dragging a particular image element when the mouse is moved

    if (mouseX > imgEyeX && mouseX < imgEyeX + eyeImg.width - 90 &&
      mouseY > imgEyeY && mouseY < imgEyeY + eyeImg.height - 90) {
      draggingEye = true;
    } else if (mouseX > imgEarsX && mouseX < imgEarsX + earsImg.width - 300 &&
      mouseY > imgEarsY && mouseY < imgEarsY + earsImg.height - 350) {
      draggingEars = true
    } else if (mouseX > imgHatX && mouseX < imgHatX + hat.width - 300 &&
      mouseY > imgHatY && mouseY < imgHatY + hat.height - 300) {
      draggingHat = true
    } else if (mouseX > imgBowX && mouseX < imgBowX + bowtie.width - 250 &&
      mouseY > imgBowY && mouseY < imgBowY + bowtie.height - 200) {
      draggingBow = true

    }


  }





  //startGame.mousePressed()
}

function mouseReleased() {
  // If the image was being dragged, drop it
  if (draggingEye || draggingEars || draggingHat || draggingBow) {

    //the eye, ears, hat or bow are not being dragged
    draggingEye = false;
    draggingEars = false
    draggingHat = false
    draggingBow = false
  }
}




class Game {
  //limit the clickable area
  constructor() {

    this.canvas = createCanvas(400, 400);
    //listens to a mouse event
    this.canvas.mousePressed(this.handleClick.bind(this));
    //allows flexibility of matching colors 
    this.tolerance = 130;
    //the color to identify is red
    this.colorRedToMatch = color(255, 0, 0)


    // - gradient : https://youtu.be/-MUOweQ6wac 
    // - progress bar : ChatGPT

    //initial value of the bar is 0
    this.progress = 0

    //the maximum value is 100
    this.maxProgress = 100
    //button allowing the player to display the story 
    this.buttonDisplayInfo;

    //button allowing the player to feed the animal
    this.buttonDisplayFood;

    //the animal is not being initally fed
    this.isFeeding = false

    //button has not been created yet
    this.buttonCreatedInfo = false

    ////button has not been created yet
    this.buttonCreatedFood = false

    //the story has not been initially created
    this.divCreated = false

    //to close the pop up
    this.buttonClose = false

    //the button to remove the pop up
    this.buttonX;


    //loading assets
    this.soundInstructions = loadSound('assets/sounds/instruction.mp3')
    this.gift = loadImage('assets/images/gift.png')
    this.leaf = createImage('assets/images/leaf2-smoll.gif')


    this.giftXAdd = 0
    this.giftYAdd = 0
    //does not initially show the gifts
    this.showGift = false

    //there are no gifts when the game starts
    this.gifts = []
    this.rowsGifts = 0

    //the image has not been downloaded
    this.imageDownloaded = false



  }



  main() {


    if (pictureTaken && !webcamCapture.loadingPageOn) {

      //if the picture has been taken and loading page has disappeared excecute these functions below

      //display all buttons
      this.showInfoButton()
      this.showFoodButton()

      //draw jungle
      this.drawForest()

      //draw face and clothes 
      this.drawFaceFeatures()

      //actions the gradient bar does
      this.GradientBar()

    }

    //This code block is executed when the user is dragging an image element (eye, ears, hat, or bowtie) with the mouse
    if (draggingEye) {

      //checks which image element is being dragged based on the dragging properties set in the mousePressed()

      //checks which image element is being dragged based on the dragging properties set in the mousePressed()
      imgEyeX = mouseX;
      imgEyeY = mouseY;

      //cursor is set arrow 
      cursor(ARROW)
    } else if (draggingEars) {
      imgEarsX = mouseX
      imgEarsY = mouseY
      cursor(ARROW)

    } else if (draggingHat) {
      imgHatX = mouseX
      imgHatY = mouseY

    } else if (draggingBow) {
      imgBowX = mouseX
      imgBowY = mouseY
    }

    if (this.divCreated) {

      //if the div has been created then display story 
      this.displayStory()

      //style and displays the x buttopn
      this.displayXIcon()


    }



  }

  drawForest() {

    //displays all the assets to draw the forest 
    image(leaf, 0, height - 300, 0, 300);
    image(leaf3, 20, height - 150, 300, 0);
    image(leaf2, 100, height - 100, 400, 0);
    image(leaf1, 120, height - 300, 300, 0);
    image(leaf4, 60, height - 150);
    image(leaf5, 0, height - 450, 0, 550);
    image(leaf6, 20, height - 300);
    image(leaf7, 800, height - 400, 400, 0);
    image(leaf10, width - 190, height - 290);
    image(leaf8, width - 290, height - 150);
    image(leaf9, width - 290, height - 290);
    image(leaf2, width - 290, height - 130);
    image(jungletop, 0, 0, 1422, 500);
    image(vine, 0, 0, 800, 900)
    image(vine2, -220, -50, 800, 900)
    image(vine3, 650, 0, 800, 900)

  }

  showFoodButton() {

    //creates the feed me button and listens to the mouse event 

    if (!this.buttonCreatedFood) {

      //creates a button with the text "Feed Me!"
      this.buttonDisplayFood = createButton('Feed Me!');


      //position of button
      this.buttonDisplayFood.position(100, windowHeight - 150);

      //style button 
      this.styleButton(this.buttonDisplayFood)

      //if the button is pressed then take a picture 
      this.buttonCreatedFood = true

      //excecutes steps between brackets when the mouse is pressed
      this.buttonDisplayFood.mousePressed(() => {

        //change the cursor icon
        cursor('assets/images/foodv2.png')

        //the player is feeding the animal 
        this.isFeeding = true

      });
    }
  }

  showInfoButton() {

    //creates the story button and listens to the mouse event 

    if (!this.buttonCreatedInfo) {

      //creates a button with the text "The Story"
      this.buttonDisplayInfo = createButton('The Story');

      //position of button
      this.buttonDisplayInfo.position(100, windowHeight - 50);

      //style button 
      this.styleButton(this.buttonDisplayInfo)

      //if the button is pressed then take a picture 
      this.buttonCreatedInfo = true

      //excecutes steps between brackets when the mouse is pressed
      this.buttonDisplayInfo.mousePressed(() => {

        //the voice over is played 
        this.soundInstructions.play()

        //the div to display the story is available 
        this.divCreated = true

        //the cursor changes its icon into an arrow 
        cursor(ARROW)

      });

    }
  }

  displayStory() {

    //displays the story when the div is available to write on

    if (this.divCreated) {

      fill('white')
      rectMode(CENTER)

      //the wooden background
      image(loadingBackground, width / 2 - 350, height / 2 - 250, 750, 500);


      textSize(22)
      fill('white')

      text(`You find yourself lost in the middle of a dense jungle with no idea how to get out. 
      Suddenly, you come across a friendly animal that can help you find your way
      back to civilization! But in order to earn their trust, you'll need to raise
      their affection progress bar by playing with them and taking care of them.`, width / 2 + 30, 130, 800)


      text(`To get started, give your animal friend a name. Then, you can dress them up, 
         feed them, and talk to them to make them happy! Remember, ients, they'll be even
          happier and their progress bar will fill up faster..`
        , width / 2 + 30, 290, 950)


      text(`Once you've filled up their progress bar to 100%, you'll receive a gift from 
         your animal friend! Collect 8 gifts and you'll be able to save a picture of your
          new jungle buddy.`
        , width / 2 + 30, 400, 950)

      text(`So, are you ready to make a new friend and find your way out of the jungle? 
           Let's get started!`
        , width / 2 + 30, 500, 950)

      if (this.buttonClose) {
        //the button x has been clicked 
        this.buttonX.mousePressed(() => {

          //remove the div
          this.divCreated = false

          //remove button
          this.buttonX.remove()

          //stop playing the sound
          this.soundInstructions.stop()

          //the button has finished being clicked 
          this.buttonClose = false

        });

      }

    }

  }



  drawFaceFeatures() {

    //drawing all face and clothes features 

    image(loadingLightWood, 100, 100, 450, 400)
    image(eyeImg, imgEyeX, imgEyeY, 130, 70);
    image(earsImg, imgEarsX, imgEarsY, 130, 130);
    image(hat, imgHatX, imgHatY, 130, 130);
    image(bowtie, imgBowX, imgBowY, 100, 80);


  }

  displayXIcon() {

    if (!this.buttonClose && this.divCreated) {
      //if the instruction bar has not disappeard and the insructions is appearing 

      //creating button
      this.buttonX = createButton('X')
      //setting the postion
      this.buttonX.position(width / 2 + 370, 130);
      //setting the size 
      this.buttonX.size(30, 30)

      //styling button X
      this.buttonX.style('background-color', '#805209');
      this.buttonX.style('color', 'white');
      this.buttonX.style('font-size', '24px');
      this.buttonX.style('border', 'none');
      this.buttonX.style('border-radius', '5px');

    }

    this.buttonClose = true

  }

  handleClick() {
    //chatGPT, "get pixel color  after mouse click in p5.js in a class", march 25th

    if (pictureTaken) {

      //identifies the x and y region 
      let regionX = width / 2 - 600 / 2;
      let regionY = height / 2 - 600 / 2;


      //"delimit the clickable area to a rectangular region in the middle of the screen", chatGPT march 
      //checks if the mouse clicks in the region
      if (mouseX > regionX && mouseX < regionX + 600 && mouseY > regionY && mouseY < regionY + 600) {

        rectMode(CORNERS)

        // Get the pixel color at the clicked position

        let pixelColor = get(mouseX, mouseY);


        //red value of the pixel
        let r = pixelColor[0];
        //green value of the pixel
        let g = pixelColor[1];
        //blue value of the pixel
        let b = pixelColor[2];



        //checks the color of the pixel
        this.checkRed(r, g, b)




      }

    }
  }



  GradientBar() {

    console.log('num of gifts',)

    //created gradient bar 
    this.createGradientBar()

    //updated proges bar text
    this.progressBarText()

    //check if progress bar is complete 
    this.progressBarComplete()

    //show gifts on screen
    this.displayGifts()


  }

  createGradientBar() {

    //draws gradient 
    rectMode(CORNERS)
    noStroke();

    // Empty prograss bar
    fill("#BDDBE1");
    rect(100, 70, 390, 30, 20);

    //Fill the gradient progress bar
    let gradient = drawingContext.createLinearGradient(10, 0, 300, 0);
    //adds gradient 

    //the darker color
    gradient.addColorStop(0, color("#45ee23"));
    //the lighter color
    gradient.addColorStop(1, color("#227a16"));
    drawingContext.fillStyle = gradient;

    //draws gradient, the length depends on the percentage 
    rect(100, 70, this.progress * 3 + 100, 30, 20);

  }

  progressBarText() {
    // Percentage text
    fill("black");
    textSize(22)
    textAlign(CENTER, CENTER);
    text(`${round(this.progress / this.maxProgress * 100)}%`, 240, 49);

  }


  displayGifts() {
    //displays a list of gift images on a canvas

    //checks whether the showGift property is true,
    // which indicates that there are gifts to be displayed. 
    //If so, it loops through the array of gifts and displays
    // each gift image using the image() function

    if (this.showGift) {
      console.log('showing gift')
      let j = 0
      for (let i = 0; i < this.gifts.length; i++) {

        //If the gifts fit within the canvas width, 
        //they are displayed on the same row. 
        //Otherwise, the gifts are displayed on the next row, 
        //with a y-coordinate offset of 50 pixels

        if (width - (200 - (i * 40)) <= 1342) {
          image(this.gifts[i], width - (200 - (i * 40)), 50 + this.giftYAdd, 50, 50)

        } else {

          image(this.gifts[i], width - (200 - (j * 40)), 50 + this.giftYAdd + (1 * 50), 50, 50)
          j++

        }

      }

      //, the code uses a setTimeout() 
      //function to wait for 3 seconds before resetting the gifts array and setting 
      //the imageDownloaded property to false. Additionally, if imageDownloaded is false,
      // the downloadImage() function is called


      //check if the number of gifts is equal to 8
      this.checkNumberGifts()

    }
  }

  checkNumberGifts() {

    if (this.gifts.length === 8) {
      //If the length of the gifts array is equal to 8
      setTimeout(() => {
        // wait for 3 seconds before emptying the gifts array 
        this.gifts = []
        //and stating the image has not been downloaded yet
        this.imageDownloaded = false
      }, 3000)

      if (!this.imageDownloaded) {
        //if the images has not been downloaded yet, download the image 
        this.downloadImage()
      }
    }

  }

  downloadImage() {
    //downloads the image 
    saveCanvas("screenshot", "png")
    //the image has been downloaded 
    this.imageDownloaded = true

  }




  checkRed(r, g, b) {
    //checks if the pixel that has been clicked on is red 
    //if it yes then the progress bar will become greener 

    //the color that matches the color of the pixel

    //the r color
    let matchRedR = this.colorRedToMatch.levels[0];

    //the green color
    let matchRedG = this.colorRedToMatch.levels[1];

    //the blue color
    let matchRedB = this.colorRedToMatch.levels[2];


    //checks if the pixel matches the color desired
    //the tolerence allows a little flexibility in terms of deciding 
    //if the pixel color matches the desired color
    //the red color could be darker or lighter 

    if (r >= matchRedR - this.tolerance && r <= matchRedR + this.tolerance &&
      g >= matchRedG - this.tolerance && g <= matchRedG + this.tolerance &&
      b >= matchRedB - this.tolerance && b <= matchRedB + this.tolerance) {

      //the pixel that has been clicked on matches the desired color 

      if (this.isFeeding) {

        //the feeding feature is on, the progrees can therefore increase 
        this.progress = min(this.progress + 20, 100);

      }

      //checks the value of the progress bar 
      this.checkProgressBar()


    }
  }

  checkProgressBar() {
    //checks if the progress bar has reached 100

    if (this.progress === 100) {
      //the progress bar is full

      //push a gift into the collection of gifts
      this.gifts.push(this.gift)



    }

  }

  progressBarComplete() {

    if (this.progress === 100) { // If the progress bar is 100% filled...
      setTimeout(() => {


        this.progress = 0 // Turn back the progress bar to 0%

        textSize(36)
        fill('black')
        this.showGift = true // Make a gift appear
      }, 500)

    }


  }


  styleButton(button) {

    //stylig the two buttons 

    button.style('width', '150px');
    button.style('height', '50px');
    button.style('background-image', 'linear-gradient(#3A8F4C, #79BC8C)');
    button.style('color', '#fff');
    button.style('border', 'none');
    button.style('font-size', '20px');
    button.style('border-radius', '10px');
    button.style('border', '3px solid #0E272D');

  }

}


class WebCam {

  //chatGPT, "take a picture after clicking on a button in p5.js class", march 25th
  //'live capture to be taken", https://editor.p5js.org/son/sketches/LuJ2eGf9p
  constructor() {

    //capturing the video
    this.capture = null;

    //canvas for the webcam
    this.canvas = null;

    //store the picture taken 
    this.imgBackground = null;

    //button to take a picture 
    this.buttonTakePicture

    //to check if the loading page has loaded
    this.loadingPageOn = false

    //to check if the button has been clicked
    this.buttonClicked = false
    this.buttonTPClicked = false

    //to store the timer when the button Take Picture has been clicked 
    this.startCountdown;

    //the number of seconds the countdown will be 
    this.countdown = 5

    //to check if the button has been created 
    this.buttonTPCreated = false



  }

  setup() {

    //setting up size of canvas
    this.canvas = createCanvas(windowWidth, windowHeight);

    //get video
    this.capture = createCapture(VIDEO);

    //size of the video
    this.capture.size(windowWidth, windowHeight);

    //hide video
    this.capture.hide();


  }

  updateCountdown() {
    //calculates the remaining time for a countdown

    //the difference between the current time (in milliseconds) and the start time of the countdown
    let elapsedTime = millis() - this.startCountdown;

    //the time remaining for the countdown (in seconds)
    //Math.floor used to round down the elapsed time to the nearest second
    let remainingTime = this.countdown - Math.floor(elapsedTime / 1000);

    // return the remaining time or 0 if the countdown has ended
    return remainingTime >= 0 ? remainingTime : 0;
  }

  countdownTimer() {

    //get and displays the current time left 
    let remainingTime = this.updateCountdown();

    //styling the text
    textAlign(CENTER, CENTER);
    fill('white')
    noStroke()
    textSize(92);
    text(remainingTime, width / 2, height / 2); // display the remaining time


  }

  takePicture() {

    //keeps the current frame so it can take the picture

    //the video is removed
    this.capture.remove()

    //the button is removed 
    this.buttonTakePicture.remove()

  }


  displayScreen() {
    //displays the photo that has been taken with the camera 
    // or displays the loading screen 
    //the choice depends on how long since the the player has taken the picture 

    if (pictureTaken) {

      let elapsed = millis() - this.startTimeLoadingPage

      if (elapsed > 3500) {
        //3.5 seconds has passed

        //remove loading page
        this.loadingPageOn = false

        //display picture taken with webcam
        this.displayWebcamCapture()


      } else {
        //3.5 has not passed yet

        //keep displaying the loading page
        this.loadingPageOn = true

        //let the image behave as background
        background(loadingBackground)


        //styling the loading page
        rectMode(CENTER)
        image(egg, width / 2 - 100, height / 2 - 150, 200, 200)
        textSize(36)
        noStroke()
        fill('#08A11C')
        text('hatching...', width / 2, height / 2 + 100)

      }


    }

  }

  displayWebcamCapture() {

    //displays what has taken by the webcam
    image(this.imgBackground, 0, 0, width, height)

    //remove the loading page
    this.loadingPageOn = false
  }


  saveImage() {
    //saves the current video display as the background image 

    //captures the current video display 
    imageToSave = this.capture.get()

    //sets the current video display as the background image
    this.imgBackground = imageToSave;
  }


  displayTPButton() {

    //displays the TP button and excecutes actions once the button has been clicked 
    if (!this.buttonTPCreated) {

      //sets up the camera 
      this.buttonTakePicture = createButton('Take Picture');

      //startGame.styleButton(webcamCapture.buttonTakePicturebuttonTakePicture)
      this.buttonTPCreated = true
      //position of button
      this.buttonTakePicture.position(windowWidth - 100, windowHeight - 100);

      //styling the button
      this.buttonTakePicture.style('background-color', '#087517')
      this.buttonTakePicture.style('color', 'white')
      this.buttonTakePicture.style('font-family', 'sans-serif')

      //if the button is pressed then take a picture 
      this.buttonTakePicture.mousePressed(() => {
        //button has been clicked
        this.buttonClicked = true

        //starts time 
        this.startCountdown = millis()
        setTimeout(() => {
          //after 5 seconds, the video display is saved as a picture and showed as a background

          //the picture has been taken
          pictureTaken = true

          //the button is no longer clicked 
          this.buttonClicked = false

          //removes the button
          this.buttonTakePicture.remove()
          this.buttonTPClicked = true

          //captures the video display and makes it a background
          this.saveImage()

          //starts timer to know how long the loading page appeared
          this.startTimeLoadingPage = millis()
        }, 5000)
      });

    }

  }


  main() {
    //main function of the class
    //the general functions are mentionned 

    if (!pictureTaken) {
      //if the picture has not been taken 

      if (!loading) {

        //if nothing is loading display take picture button 
        this.displayTPButton()

      }

      //displaying video 
      image(this.capture, 0, 0, windowWidth, windowHeight);

    } else {

      //if picture is taken, take picture 
      this.takePicture()

    }

    if (!loading && !this.buttonTPClicked) {
      //if there is no loading page appearing the button take picture has not been clicked yet

      //draws rectangle
      setTimeout(this.drawPlaceHolder(), 1000)

      //displaying text on the bottom of the screen while the video is playing 
      this.textInstructions()
    }


  }

  textInstructions() {

    //styling the text 
    noStroke()
    fill('white')
    textAlign(CENTER, CENTER)
    textSize(50)
    text('Build an animal with your blocks!', 300, height - 50)
  }

  drawPlaceHolder() {

    // Draw a box on top of the video

    //styling 
    stroke(8, 161, 28);
    strokeWeight(2);
    noFill()
    rectMode(CENTER)
    rect(width / 2, height / 2, 400, 400,);

  }



}



