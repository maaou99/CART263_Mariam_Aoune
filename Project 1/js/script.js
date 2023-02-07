/**
Title of Project: Tic Tac Toe game CART263
Author Name: Mariam Aoune

 
*/

"use strict";

 
let balls = []
let singleBall = []
let startTime;
let isPlaying = false
let button
let mySound;
 

function preload() {
   mySound = loadSound('/assets/sounds/audio_final.mp4');
 
}

/**
Description of setup
*/
function setup() {
    //create button to start animation
    button = createButton("Play Animation");
    button.mousePressed(playAudioAndDraw);

    createCanvas(500, 500)
    rectMode(CENTER)
    noStroke()
    frameRate(15)
    colorMode(HSB, 360, 100, 100);
   
   
    //creates an instance of 50 shapes
    //each shape has a random size, and x/y positions
    for(let i = 0; i< 100; i++){
        balls[i] = new Particle(random(5,20), random(200,300), random(200,300))
    }

}

/**
Description of draw()
*/

function playAudioAndDraw(){
    //playes the music 
    //stylize the button
    let audio = new p5.SoundFile('/assets/sounds/audio_final.mp4');

    isPlaying = true

    //plays the music
    mySound.play();

    //starts the timer
    startTime = millis();

    //stylized the button
    button.style("display", "none");

   
 
}

function draw() {
    background(color(0, 0, 100 - frameCount/3));
 if(isPlaying){

  
   //the animation is playing 

    //time the program is running
    let elapsedTime = millis() - startTime;
   
    for(let i = 0; i < balls.length; i++){
    //goes through each ball and preforms actions
        
        //draws a ball
        balls[i].draw(i)

        //x and y values are modified 
        balls[i].move()

        //keeps the ball within the range 
        balls[i].bounce()
      
        if(elapsedTime > 2400){
            //speed is reduced after a certain amount of time 
            balls[i].reduceSpeed()
          
        } else {
            //speed is increased
            balls[i].increaseSpeed()

        }
    }  

 }
     
}


class Particle{
    constructor(randomSize, x, y){
        this.background = 'white'
        this.x = x
        this.y = y
        this.mouse = mouseX
        this.speed = 0.5
        this.size = randomSize
        this.flickering = true
        this.alpha = 1
        this.h = random(360)
        this.s = random(90,100)
        this.b = random(90,100)
        this.color = color(this.h,  this.s,   this.b, this.alpha);

        //the single particle has not appeared yet
        this.singleParticle = false
        this.blur = 0

        //the blur has not appeared yet
        this.blurVariation = false
        this.transparentShape = false

        this.xoff = 0
        this.yoff = 0

    }

    showOneParticle(){
    //one particle appears after all the particles have disapeared
        singleBall = [balls[11]]
        
        //the ball array is now a length of one 
        balls = singleBall
         
       
    }

 
    reduceOpacity(colorParticle){
      //reduces opacity by 0.025 every frame 
      this.background = '#F5F5F5'
      this.alpha = this.alpha - 0.025
      
      if(this.alpha <= 0 ){
       //when the particles disapears a single particle will disapear 
        this.singleParticle = true 
        this.background = '#A9A9A9'
        this.alpha = 1  
      }
      
        return this.alpha
    }

 
    reduceSpeed(){
        if(this.speed >= 1 ){

            //reduces the speed by 0.2 each frame 
            this.speed = this.speed - 0.2
            return this.speed

        } else {

            //when the particles stop moving, reduce speed
            this.flickering = false    
        } 
       
    }

    increaseSpeed(){

     if(this.speed < 20){
        //increases speed by one if speed is less than 20
        return this.speed++
     }
      
    }

    fillSpikyShape(){
     //creates a new fill
            fill(this.h, this.s, this.b, this.alpha) 

            if(this.flickering){
                //changes the fill
                this.newColor()
            }
    }

    move(){

        if(this.speed >= 2){
            //x and y position varies depend on the speed of the particle
            this.x += random(-this.speed, this.speed)
            this.y += random(-this.speed, this.speed)

        } else {
            //use of noise to jiggle the particles
            this.xoff += 0.1
            this.yoff += 0.1
            this.x +=  random(-noise(this.xoff) * 2, noise(this.xoff)  * 2)
            this.y += random(-noise(this.yoff) * 2, noise(this.yoff) * 2)
        }

    }

    drawSpikyShape(){
        //reference: https://editor.p5js.org/squishynotions/sketches/2I2CpRpn6

        //draws the spikey shapes

        push();
        let numSpikes = 10
        
        translate(this.x, this.y);
        for (let i = 0; i < numSpikes; i++) {
          rotate(TWO_PI / numSpikes);
          triangle(0, 0, this.size / 2, this.size / 2, 0, this.size + random(2,20));
        }
        pop();
    }
    
    draw(index){
         
       //main method of the class
       //1. draws spiky shapes before the blur 
       //2. all shapes disapear except one
       //3. blurs one particle
       //4. the single spiky particle becomes a shape with polar coordinates 
     
       if(!this.blurVariation){
        this.drawSpikyShape()
        this. fillSpikyShape()
       } else {
        this.drawPolarShape()
      
       }

    if (balls.length === 1){
        this.toBlur() 
    }

    if(this.singleParticle && balls.length > 1 ){
         
        balls[10].showOneParticle()
         
     } else if( index != 10 && !this.singleParticle && !this.flickering ) { 
           
        this.reduceOpacity()
       
    }}

    toBlur(){
        if(!this.blurVariation){
            //adds blur effect 
            drawingContext.filter = 'blur('+String(this.blur)+ 'px)';

            //increases blur
            this.blur += 0.3
          
            if(this.blur > 25){
                //blur has finished increasing 
                this.blurVariation = true
                return 
            }

        } else {
            this.decreaseBlur()
        }
   
    }

    decreaseBlur(){
        this.blur -= 0.2
        drawingContext.filter = 'blur('+String(this.blur)+ 'px)';

        if(this.blur < 0 ){
          this.followMouse()
        }
    }
    
    followMouse(){

        //chatGPT: 'make object follow mouse from far p5.js', January 5th 2023
       
        let targetX = mouseX;
        let targetY = mouseY;
        this.speed = 2

        //allows the particle to move from a distance
        this.x += (targetX - this.x) * this.speed / 100;
        this.y += (targetY - this.y) * this.speed / 100;

    }
    drawPolarShape(){
        //draws geometric shape using the polar.js library 

        frameRate(120)
           
        if(!this.transparentShape){
            fill(color(100,100,100,0))
            this.transparentShape = true

        } else {
            this.fillPolarShape()
        }       
        setCenter(this.x, this.y);
        
        polarEllipses(10, 20+sin(frameCount/15)*20, 20, 20);
      
      
    }

    fillPolarShape(){
       // Vertical Gradient, https://happycoding.io/tutorials/p5js/for-loops/vertical-gradient
   colorMode(RGB)
    
      const m = 100;

      const topR = 255 * noise(frameCount / m);
      const topG = 255 * noise(1000 + frameCount / m);
      const topB = 255 * noise(2000 + frameCount / m);
      const bottomR = 255 * noise(3000 + frameCount / m);
      const bottomG = 255 * noise(4000  + frameCount / m);
      const bottomB = 255 * noise(5000 + frameCount / m);

      const topColor = color(topR, topG, topB);
      const bottomColor = color(bottomR, bottomG, bottomB);

      for(let y = 0; y < height; y++) {

        const lineColor = lerpColor(topColor, bottomColor, y / height);

          fill(lineColor);
          line(0, y, width, y);
    }
}

    newColor(){
     //creates a new color
        this.h = random(360)
        this.s = random(90,100)
        this.b = random(90,100)
  
    }

    bounce(){

        //keeps the particles within the canvas

        if(this.x > width || this.x <  0 || this.y > height || this.y <   0  ){
            this.x--
          
        } }
 
}

 