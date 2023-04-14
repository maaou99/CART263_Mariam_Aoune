/**
Title of Project: Build-A-Blocks
Authors Name: Mariam Aoune & Maloney Khim

 
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
  textFont('Delicious Handrawn')
  createCanvas(width, height);
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





  //vine1.resize(100,0)

  // createCanvas(400, 400);


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


  if (pictureTaken) {
    webcamCapture.displayScreen();

  }

  webcamCapture.main()
  startGame.main()

  if (webcamCapture.buttonClicked) {
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

    // Check if the mouse is over the image
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
    this.colorBrownToMatch = color(128, 82, 9)


    this.counter = 0
    this.eyeX = 200
    this.eyeY = 200

    // - gradient : https://youtu.be/-MUOweQ6wac 
    // - progress bar : ChatGPT
    this.progress = 0
    this.maxProgress = 100

    this.buttonDisplayInfo;
    this.buttonDisplayFood;
    this.buttonDisplayDownload;
    this.isFeeding = false
    this.buttonCreatedInfo = false
    this.buttonCreatedFood = false
    this.divCreated = false
    this.textContainer;
    this.soundIcon = loadImage('assets/images/volume.png')
    this.widthSoundIcon = 25;
    this.heightSoundIcon = 20;

    this.buttonClose = false

    this.buttonX;

    this.soundVoice = loadSound('assets/sounds/soundex.mp3')
    this.soundInstructions = loadSound('assets/sounds/instruction.mp3')
    this.gift = loadImage('assets/images/gift.png')

    this.leaf = createImage('assets/images/leaf2-smoll.gif')

    this.showGift = false
    this.giftXAdd = 0
    this.giftYAdd = 0
    this.gifts = []
    this.rowsGifts = 0

    this.isHovered = false;

    this.imageDownloaded = false



  }



  main() {


    if (pictureTaken && !webcamCapture.loadingPageOn) {

      //this.displayCounter()

      this.showInfoButton()
      this.showFoodButton()
      this.displayStory()
      this.drawForest()
      this.drawFaceFeatures()
      this.GradientBar()
      //this.showDownloadButton()




    }



    if (draggingEye) {
      imgEyeX = mouseX;
      imgEyeY = mouseY;
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
      this.displayStory()

      this.displaySoundIcon()


    }



  }

  drawForest() {

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



    // image(vine1, 0, 0, 800, 900)




  }

  showFoodButton() {
    if (!this.buttonCreatedFood) {

      this.buttonDisplayFood = createButton('Feed Me!');


      //position of button
      this.buttonDisplayFood.position(100, windowHeight - 150);
      this.styleButton(this.buttonDisplayFood)
      //if the button is pressed then take a picture 
      this.buttonCreatedFood = true

      this.buttonDisplayFood.mousePressed(() => {
        cursor('assets/images/foodv2.png')
        this.isFeeding = true


      });

    }

  }

  showInfoButton() {

    if (!this.buttonCreatedInfo) {

      this.buttonDisplayInfo = createButton('The Story');

      //position of button
      this.buttonDisplayInfo.position(100, windowHeight - 50);


      this.styleButton(this.buttonDisplayInfo)

      //if the button is pressed then take a picture 
      this.buttonCreatedInfo = true

      this.buttonDisplayInfo.mousePressed(() => {
        this.soundInstructions.play()
        this.divCreated = true
        cursor(ARROW)

      });

    }
  }

  displayStory() {

    if (this.divCreated) {

      fill('white')
      rectMode(CENTER)

      image(loadingBackground, width / 2 - 350, height / 2 - 250, 750, 500);
      //rect(width/2, height/2, 500, 400);

      textSize(22) // Make the text size 22px
      fill('white') // Make the text color white

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

        this.buttonX.mousePressed(() => {

          this.divCreated = false
          this.buttonX.remove()
          this.soundInstructions.stop()
          this.buttonClose = false
          this.soundVoice.stop()
        });

      }
      //this.canvas.mousePressed(this.removeDiv.bind(this))

    }

  }



  drawFaceFeatures() {

    image(loadingLightWood, 100, 100, 450, 400);

    image(eyeImg, imgEyeX, imgEyeY, 130, 70);
    image(earsImg, imgEarsX, imgEarsY, 130, 130);
    image(hat, imgHatX, imgHatY, 130, 130);
    image(bowtie, imgBowX, imgBowY, 100, 80);


  }

  displaySoundIcon() {
    fill('#805209')
    rect(width / 2 + 350, 520, 50, 50)
    image(this.soundIcon, width / 2 + 335, 510, this.widthSoundIcon, this.heightSoundIcon);

    if (!this.buttonClose && this.divCreated) {
      this.buttonX = createButton('X')
      this.buttonX.position(width / 2 + 370, 130);
      this.buttonX.size(30, 30)

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
        this.checkBrown(r, g, b)



      }

    }
  }



  GradientBar() {

    this.createGradientBar()
    this.progressBarText()


    this.progressBarComplete()
    this.displayGifts()


  }

  createGradientBar() {
    rectMode(CORNERS) // Change the rectMode to CORNERS
    noStroke(); // Remove the stroke of the gradient
    // Empty progress bar
    fill("#BDDBE1"); // Make the empty progress bar a bluish white color
    rect(100, 70, 390, 30, 20); // Create the empty progress bar with a rounded rectangle

    //Fill the gradient progress bar
    let gradient = drawingContext.createLinearGradient(10, 0, 300, 0); // Create a new gradient using the createLinearGradient() method of the drawingContext object. The gradient starts at position (10, 0) and ends at position (300, 0).


    gradient.addColorStop(0, color("#45ee23")); // Make the first color of the gradient light green 
    gradient.addColorStop(1, color("#227a16")); // Make the second color of the gradient a darker green  
    drawingContext.fillStyle = gradient; // Set the fill style of the following rectange to this gradient 

    rect(100, 70, this.progress * 3 + 100, 30, 20); // Create the filling of the progress bar with a rounded rectangle that has a gradient 

  }

  progressBarText() {
    // Percentage text
    fill("black"); // Make the text color black
    textSize(22) // Make the text size 22px
    textAlign(CENTER, CENTER); // Align the percentage text in the center of the progress bar
    text(`${round(this.progress / this.maxProgress * 100)}%`, 240, 49); // Displays the current filling of the progress bar as a percentage

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

  displayGifts() {

    if (this.showGift) {
      let j = 0
      for (let i = 0; i < this.gifts.length; i++) {

        if (width - (200 - (i * 40)) <= 1342) {
          image(this.gifts[i], width - (200 - (i * 40)), 50 + this.giftYAdd, 50, 50)

        } else {

          image(this.gifts[i], width - (200 - (j * 40)), 50 + this.giftYAdd + (1 * 50), 50, 50)
          j++


        }



      }

      if (this.gifts.length === 8) {
        setTimeout(() => {
          this.gifts = []
          this.imageDownloaded = false
        }, 3000)

        if (!this.imageDownloaded) {
          this.downloadImage()
        }
      }

    }



  }

  downloadImage() {
    saveCanvas("screenshot", "png")
    this.imageDownloaded = true

  }



  checkBrown(r, g, b) {

    let matchGreenR = this.colorBrownToMatch.levels[0];
    let matchGreenG = this.colorBrownToMatch.levels[1];
    let matchGreenB = this.colorBrownToMatch.levels[2];


    if (r === matchGreenR && g === matchGreenG && b === matchGreenB) {
      alert('hi')

      //counter appears


    } else {

    }

  }


  checkRed(r, g, b) {

    //the color that matches the color of the pixel
    let matchRedR = this.colorRedToMatch.levels[0];
    let matchRedG = this.colorRedToMatch.levels[1];
    let matchRedB = this.colorRedToMatch.levels[2];


    //checks if the pixel matches the color desired
    //the tolerence allows a little flexibility in terms of deciding 
    //if the pixel color matches the desired color
    //the red color could be darker or lighter 

    if (r >= matchRedR - this.tolerance && r <= matchRedR + this.tolerance &&
      g >= matchRedG - this.tolerance && g <= matchRedG + this.tolerance &&
      b >= matchRedB - this.tolerance && b <= matchRedB + this.tolerance) {



      if (this.isFeeding) {
        this.progress = min(this.progress + 20, 100);

      }

      this.checkProgress()

      //counter appears

    } else {
      this.isHovered = false
    }
  }

  checkProgress() {
    console.log('checkinggg')
    if (this.progress === 100) {

      this.gifts.push(this.gift)

      if (this.gifts.length % 4 === 0) {
        this.rowsGifts++
      }

    }

  }




  displayCounter() {

    //styling of the counter 
    fill('white')
    noStroke()
    rect(80, 60, 90, 60)
    fill('black')
    //the text is updated with the counter value 
    text(`Counter: ${this.counter}`, 50, 60)


  }

  styleButton(button) { // Style the button The Story & Feed Me!

    button.style('width', '150px'); // Make the button's width 150px long
    button.style('height', '50px'); // Make the button's height 50px high
    button.style('background-image', 'linear-gradient(#3A8F4C, #79BC8C)'); // Make the button's background color a gradient green
    button.style('color', '#fff'); // Make the button's text color black
    button.style('font-size', '20px'); // Make the font size of the button text 20px big
    button.style('border-radius', '10px'); // Make the button's corners slightly roundish
    button.style('border', '3px solid #0E272D'); // Make the borders of the button 3px thick, in a solid line style and dark green color

  }

}


class WebCam {

  //chatGPT, "take a picture after clicking on a button in p5.js class", march 25th
  //'live capture to be taken", https://editor.p5js.org/son/sketches/LuJ2eGf9p
  constructor() {

    this.capture = null;
    this.canvas = null;
    this.imgBackground = null;
    this.imageToSave = null
    this.buttonTakePicture
    this.loadingPageOn = false
    this.startTime;
    this.buttonClicked = false
    this.startCountdown;
    this.countdown = 5
    this.buttonTPClicked = false
    this.buttonTPCreated = false



  }

  setup() {
    this.canvas = createCanvas(windowWidth, windowHeight);

    //get video
    this.capture = createCapture(VIDEO);

    //size of the video
    this.capture.size(windowWidth, windowHeight); //change the size to 320 x 240
    this.capture.hide();








  }

  updateCountdown() {
    let elapsedTime = millis() - this.startCountdown; // calculate the elapsed time
    let remainingTime = this.countdown - Math.floor(elapsedTime / 1000); // calculate the remaining time
    return remainingTime >= 0 ? remainingTime : 0; // return the remaining time or 0 if the countdown has ended
  }

  countdownTimer() {

    let remainingTime = this.updateCountdown();

    textAlign(CENTER, CENTER);
    fill('white')
    noStroke()
    textSize(92);
    text(remainingTime, width / 2, height / 2); // display the remaining time


  }



  takePicture() {


    //steps once the picture is taken 

    //the picture is taken


    //saves the image 
    //finalImage = image(this.capture, 0, 0, windowWidth, windowHeight); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas

    //the video is removed
    this.capture.remove()

    //the button is removed 
    this.buttonTakePicture.remove()




  }

  displayScreen() {



    let elapsed = millis() - this.startTime

    if (elapsed > 3500) {
      this.loadingPageOn = false
      this.displayWebcamCapture()


    } else {

      this.loadingPageOn = true
      background(loadingBackground)


      rectMode(CENTER)
      image(egg, width / 2 - 100, height / 2 - 150, 200, 200)
      textSize(36)
      noStroke()
      fill('#08A11C')
      text('hatching...', width / 2, height / 2 + 100)


    }


  }

  displayWebcamCapture() {

    image(this.imgBackground, 0, 0, width, height)
    this.loadingPageOn = false
  }

  saveImage() {
    imageToSave = this.capture.get()
    //image(imageToSave, 0, 0, windowWidth, windowHeight)
    this.imgBackground = imageToSave;
  }

  displayTPButton() {

    if (!this.buttonTPCreated) {

      //sets up the camera 
      this.buttonTakePicture = createButton('Take Picture');

      //startGame.styleButton(webcamCapture.buttonTakePicturebuttonTakePicture)
      this.buttonTPCreated = true
      //position of button
      this.buttonTakePicture.position(windowWidth - 100, windowHeight - 100);

      this.buttonTakePicture.style('background-color', '#087517')
      this.buttonTakePicture.style('color', 'white')
      this.buttonTakePicture.style('font-family', 'sans-serif')

      //if the button is pressed then take a picture 
      this.buttonTakePicture.mousePressed(() => {
        this.buttonClicked = true
        this.startCountdown = millis()
        setTimeout(() => {
          pictureTaken = true
          this.buttonClicked = false
          this.buttonTakePicture.remove()
          this.buttonTPClicked = true
          this.saveImage()
          this.startTime = millis()
        }, 5000)
      });


    }

  }


  main() {


    // Draw the video
    if (!pictureTaken) {
      if (!loading) {
        this.displayTPButton()



      }

      image(this.capture, 0, 0, windowWidth, windowHeight);

    } else {

      this.takePicture()


    }

    if (!loading && !this.buttonTPClicked) {

      //draws rectangle
      setTimeout(this.drawPlaceHolder(), 1000)
      this.textInstructions()
    }


  }

  textInstructions() {
    console.log('working')
    noStroke()
    fill('white')
    textAlign(CENTER, CENTER)
    textSize(50)
    text('Build an animal with your blocks!', 300, height - 50)
  }

  drawPlaceHolder() {

    // Draw a box on top of the video
    stroke(8, 161, 28);
    strokeWeight(2);
    noFill()
    rectMode(CENTER)
    rect(width / 2, height / 2, 400, 400,);

  }



}

