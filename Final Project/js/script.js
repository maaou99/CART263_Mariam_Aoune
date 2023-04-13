/**
Title of Project: Building Blocks 
Author Name: Mariam Aoune & Maloney Khim

 
*/

"use strict";

/*improvemnts
- allow user to press a key when they are ready to take a picture
-use blocks of different color */

// cursor(), https://p5js.org/reference/#/p5/cursor
//createButton(), https://p5js.org/reference/#/p5/createButton
// text(), https://p5js.org/reference/#/p5/text 
//how to know if an image has been loaded in p5.js , chat gpt
//Make a draggable object or drag and drop object in p5.js, https://www.youtube.com/watch?v=D_cNsBSgKDA
//save a p5.js image taken with a webcam and use it as a background image p5.js in a class, chat gpt
//loading animation, https://www.youtube.com/watch?v=UWgDKtvnjIU&t=330s&ab_channel=TheCodingTrain
//loading bar, https://editor.p5js.org/gpetrioli/sketches/SyibBz_ff
//speech Recognition, https://editor.p5js.org/dano/sketches/T-XASCOsa
// image mode, https://p5js.org/reference/#/p5/imageMode
let pictureTaken = false
let webcamCapture
let startGame
let finalImage
let imageToSave;
let backgroundImage;
let eyeImg, earsImg;
let imgEyeX, imgEyeY; // position of the image
let imgEarsX, imgEarsY
let imgHatX, imgHatY
let imgBowX, imgBowY
let draggingEye = false; // true if the image is being dragged
let draggingEars = false
let draggingHat = false
let draggingBow = false
let speechRec;
let leaf
let leaf1
let leaf2
let leaf3
let leaf4
let leaf5
let leaf6
let leaf7
let leaf8
let leaf9
let leaf10
let leaf11
let jungletop
let vine
let vine1
let vine2
let vine3
let egg
let hat
let  bowtie

let loading = true
let loadingBackground
let  loadingLightWood

let  x
let startAt = 0

function imageloaded(){
 
 background(loadingBackground)
  
  
 textSize(80)
 fill('white')
 textAlign(CENTER,CENTER)
 noStroke()
 text('Build-A-Blocks', width/2, height/2-50)
  stroke('green');
  strokeWeight(20);

//x = map(0, startAt, 0, startAt+50 , 100);

 
  line(width/2 - width/4, height/2 + height/6, width/2 - width/4 + (startAt * 400), height/2 + height/6);
  startAt += 0.1
 
}


function preload() {
  loadingBackground = loadImage('assets/images/wooden_bck-8.png')
  loadingLightWood = loadImage('assets/images/light_wood.png')


 

}

function setup() {
  textFont('Delicious Handrawn')
  createCanvas(width, height);
  imgEyeX = width / 2  + 120;
  imgEyeY = height / 2 + 100;

  imgEarsX = imgEyeX + 200
  imgEarsY = imgEyeY

  imgHatX = imgEyeX
  imgHatY =  imgEarsY + 100

  imgBowX = imgEarsX 
  imgBowY = imgEarsY + 150

  eyeImg = loadImage('assets/images/eyes(2).gif', imageloaded);
  hat = loadImage('assets/images/hat.png', imageloaded);
  bowtie = loadImage('assets/images/bowtie.png', imageloaded);
  leaf = loadImage('assets/images/leaf2-smoll.gif', imageloaded)
  egg = loadImage('assets/images/egg.gif')
 leaf1 = loadImage('assets/images/leaf1-smoll.gif', imageloaded)
 leaf2 = loadImage('assets/images/leaf3-smoll.gif', imageloaded)
 leaf5 = loadImage('assets/images/leaf6-smoll.gif', imageloaded)
 leaf6 = loadImage('assets/images/leaf7-smoll.gif', imageloaded)
 // leaf = loadImage('assets/images/leaf2-smoll.gif')
 // leaf = loadImage('assets/images/leaf2-smoll.gif')
 // leaf = loadImage('assets/images/leaf2-smoll.gif')
  earsImg = loadImage('assets/images/ears.png', imageloaded)
  leaf3 = loadImage('assets/images/leaf4-smoll.gif', imageloaded)
  leaf4 = loadImage('assets/images/leaf5-smoll.gif', imageloaded)
  leaf7 = loadImage('assets/images/leaf9-smoll.gif', imageloaded)
  leaf8 = loadImage('assets/images/leaf10-smoll.gif', imageloaded)
  leaf9 = loadImage('assets/images/leaf11-smoll.gif', imageloaded)
  leaf10 = loadImage('assets/images/leaf12-smoll.gif', imageloaded)
  jungletop = loadImage('assets/images/jungle_top.png', imageloaded)
  vine = loadImage('assets/images/vine1.png', imageloaded)
  vine1 = loadImage('assets/images/vine2-smoll.gif', imageloaded)
  vine2 = loadImage('assets/images/vine3.png', imageloaded)
  vine3 = loadImage('assets/images/vine4.png', () => 
  loading = false)

  

 
 
  //vine1.resize(100,0)
  
 // createCanvas(400, 400);


  //instantize the two classes 
  webcamCapture = new WebCam();
  startGame = new Game();


  //sets up the camera 
  webcamCapture.setup();

  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;
  speechRec.start();




}


function draw() {
 

  if (pictureTaken) {
    webcamCapture.displayScreen();

  }

  webcamCapture.main()
  startGame.main()

  if(webcamCapture.buttonClicked){
    webcamCapture.countdownTimer()

  }

  if (speechRec) {
    speechRec.continuous = true;
    speechRec.interimResults = false;
}

}

function gotSpeech() {
 //chat GPT, 'p5.js speech recognition
  if (speechRec.resultValue) {
    let said = speechRec.resultString;
     
    if (said.includes("how are you")) {
      
      startGame.progress = min(startGame.progress + 20, 100);
    }
    else if (said.includes("I love you")) {
      startGame.progress = min(startGame.progress + 20, 100);
      
    }
    else if (said.includes("you look cool")) {
      startGame.progress = min(startGame.progress + 20, 100);
       
    }
  
    startGame.checkProgress()
    speechRec.start();
  }

 
}

function mousePressed() {
 
  if(pictureTaken){

          // Check if the mouse is over the image
  if (mouseX > imgEyeX && mouseX < imgEyeX + eyeImg.width  - 90&&
    mouseY > imgEyeY && mouseY < imgEyeY + eyeImg.height  -90 ) {
    draggingEye = true;
  } else if (mouseX > imgEarsX && mouseX < imgEarsX + earsImg.width -300 &&
    mouseY > imgEarsY && mouseY < imgEarsY + earsImg.height -350) {
    draggingEars = true
  } else if(mouseX > imgHatX && mouseX < imgHatX + hat.width -300 &&
    mouseY > imgHatY && mouseY < imgHatY + hat.height -300 ){
      draggingHat = true
    } else if(mouseX > imgBowX && mouseX < imgBowX + bowtie.width - 250 &&
      mouseY > imgBowY && mouseY < imgBowY + bowtie.height -200) {
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
    this.colorBrownToMatch= color(128, 82, 9)


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

    } else if(draggingHat) {
      imgHatX = mouseX
      imgHatY = mouseY

    } else if(draggingBow){
      imgBowX = mouseX
      imgBowY = mouseY
    }

    if(this.divCreated){
      this.displayStory()
     
          this.displaySoundIcon()
 
      
    }

    

  }

  drawForest(){

    image(leaf, 0, height - 300, 0,300);
    
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

  showFoodButton(){
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

    if(this.divCreated){
      
      fill('white')
      rectMode(CENTER)
      
      image(loadingBackground, width/2 -350, height/2 -250, 750, 500);
      //rect(width/2, height/2, 500, 400);
      
      textSize(22)
      fill('white')

      text(`You find yourself lost in the middle of a dense jungle with no idea how to get out. 
      Suddenly, you come across a friendly animal that can help you find your way
      back to civilization! But in order to earn their trust, you'll need to raise
      their affection progress bar by playing with them and taking care of them.`, width/2 + 30, 130, 800)

         
         text(`To get started, give your animal friend a name. Then, you can dress them up, 
         feed them, and talk to them to make them happy! Remember, ients, they'll be even
          happier and their progress bar will fill up faster..`
           , width/2 + 30, 290, 950)
     
                    
         text(`Once you've filled up their progress bar to 100%, you'll receive a gift from 
         your animal friend! Collect 8 gifts and you'll be able to save a picture of your
          new jungle buddy.`
           , width/2 + 30, 400, 950)

           text(`So, are you ready to make a new friend and find your way out of the jungle? 
           Let's get started!`
             , width/2 + 30, 500, 950)
      if(this.buttonClose){
      
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

  displaySoundIcon(){
    fill('#805209')
    rect(width/2 + 350, 520, 50,50)
    image(this.soundIcon, width/2 + 335, 510, this.widthSoundIcon, this.heightSoundIcon);
   
    if(!this.buttonClose && this.divCreated){
      this.buttonX = createButton('X')
      this.buttonX.position(width/2 + 370, 130);
      this.buttonX.size(30,30)

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
        this.checkRed(r,g,b)
        this.checkBrown(r,g,b)

        

      }

    }
  }

 

  GradientBar() {
    
    this.createGradientBar()
    this.progressBarText()

 
      this.progressBarComplete()
      this.displayGifts()


  }

  createGradientBar(){
    rectMode(CORNERS)
    noStroke();
    // Empty prograss bar
    fill("#BDDBE1");
    rect(100, 70, 390, 30, 20);

    //Fill the gradient progress bar
    let gradient = drawingContext.createLinearGradient(10, 0, 300, 0);
    gradient.addColorStop(0, color("#45ee23"));
    gradient.addColorStop(1, color("#227a16"));
    drawingContext.fillStyle = gradient;

    rect(100, 70, this.progress * 3 + 100, 30, 20);

  }

  progressBarText(){
       // Percentage text
       fill("black");
       textSize(22)
       textAlign(CENTER, CENTER);
       text(`${round(this.progress / this.maxProgress * 100)}%`, 240, 49);

  }

  progressBarComplete(){

    if(this.progress === 100){
      setTimeout(() => {

        this.progress = 0 
        
        textSize(36)
        fill('black')
        this.showGift = true
      }, 500)

    }  

   
  }

  displayGifts(){

    if(this.showGift){
      let j = 0
      for(let i = 0; i < this.gifts.length; i++){
 
        if(width - (200 - (i * 40)) <= 1342){
          image(this.gifts[i], width - (200 - (i * 40)), 50 + this.giftYAdd, 50, 50)

        } else {
          
          image(this.gifts[i], width - (200 - (j * 40)), 50 + this.giftYAdd + (1 * 50), 50, 50)
          j++

        
        } 

     

      }
      
      if(this.gifts.length === 8){
        setTimeout(() => {
          this.gifts = []
          this.imageDownloaded = false
        }, 3000)
        
        if(!this.imageDownloaded){
          this.downloadImage()
        }
      }
   
    }

  

  }

  downloadImage(){
    saveCanvas("screenshot", "png")
    this.imageDownloaded = true
    
  }



  checkBrown(r,g,b){
  
    let matchGreenR = this.colorBrownToMatch.levels[0];
    let matchGreenG = this.colorBrownToMatch.levels[1];
    let matchGreenB = this.colorBrownToMatch.levels[2];

    
    if (r === matchGreenR  && g === matchGreenG && b === matchGreenB  ) {
        alert('hi')
   
     //counter appears


   } else {
    
   }
    
  }


  checkRed(r,g,b) {

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
      b >= matchRedB - this.tolerance && b <= matchRedB + this.tolerance  ) {
    
     
  
      if(this.isFeeding ){
        this.progress = min(this.progress + 20, 100);

      }

      this.checkProgress()

      //counter appears

    } else {
      this.isHovered = false
    }
  }

  checkProgress(){
console.log('checkinggg')
    if(this.progress === 100){
        
      this.gifts.push(this.gift)
    
      if(this.gifts.length % 4 === 0){
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

  styleButton(button){

    button.style('width', '150px');
    button.style('height', '50px');
    button.style('background-image', 'linear-gradient(#3A8F4C, #79BC8C)');
    button.style('color', '#fff');
    button.style('border', 'none');
    //button.style('padding', '10px 20px');
    button.style('font-size', '20px');
    button.style('border-radius', '10px');
    button.style('border', '3px solid #0E272D');

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

  updateCountdown(){
    let elapsedTime = millis() - this.startCountdown ; // calculate the elapsed time
    let remainingTime = this.countdown - Math.floor(elapsedTime / 1000); // calculate the remaining time
    return remainingTime >= 0 ? remainingTime : 0; // return the remaining time or 0 if the countdown has ended
  }

  countdownTimer(){
   
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
        image(egg, width/2 -100, height/2-150, 200, 200)
        textSize(36)
        noStroke()
        fill('#08A11C')
        text('hatching...', width/2, height/2 + 100)
      

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

  displayTPButton(){

    if(!this.buttonTPCreated){

       //sets up the camera 
       this.buttonTakePicture = createButton('Take Picture');

       //startGame.styleButton(webcamCapture.buttonTakePicturebuttonTakePicture)
       this.buttonTPCreated = true
       //position of button
       this.buttonTakePicture.position(windowWidth - 100, windowHeight - 100);
    
       this.buttonTakePicture.style('background-color',  '#087517')
       this.buttonTakePicture.style('color',  'white')
       this.buttonTakePicture.style('font-family',  'sans-serif')
      
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
    if (!pictureTaken ) {
      if(!loading){
        this.displayTPButton()
        


      }
    
      image(this.capture, 0, 0, windowWidth, windowHeight);

    } else { 
    
      this.takePicture()
 

    }

    if(!loading && !this.buttonTPClicked){

    //draws rectangle
     setTimeout(this.drawPlaceHolder(), 1000)
     this.textInstructions()
     }
    
     
    }

    textInstructions(){
      console.log('working')
      noStroke()
      fill('white')
      textAlign(CENTER, CENTER)
      textSize(50)
      text('Build an animal with your blocks!', 300, height - 50 )
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

