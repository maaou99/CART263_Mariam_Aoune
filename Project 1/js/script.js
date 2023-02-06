/**
Title of Project: Tic Tac Toe game CART263
Author Name: Mariam Aoune

 
*/

"use strict";
 
let ball;
let balls = []
let singleBall = []
let startTime;
let ballsFrozen = false //the balls are still jiggling 
let flickering = true 
let x = 100;
let y = 100;
let diameter = 50;
let xSpeed = 5;
let ySpeed = 3;
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
    button = createButton("Play Music");
    button.mousePressed(playAudioAndDraw);
    createCanvas(500, 500)
    noSmooth();
    rectMode(CENTER)
    background("beige")
    noStroke()
    frameRate(15)
    colorMode(HSB, 360, 100, 100);
   
    for(let i = 0; i< 50; i++){
        balls[i] = new Particle(random(10,20), random(200,300), random(200,300))
    }

}

/**
Description of draw()
*/

function playAudioAndDraw(){
    let audio = new p5.SoundFile('/assets/sounds/audio_final.mp4');
    isPlaying = true
    mySound.play();
    startTime = millis();
    button.style("display", "none");
 
}
function draw() {
   // pastel, dreamy colors : color(random(200,255), random(200,255), random(200,255) )
   background("beige")
 if(isPlaying){
   
    let elapsedTime = millis() - startTime;
   
    for(let i = 0; i < balls.length; i++){
 
        
        balls[i].draw(i)
        balls[i].move()
        balls[i].bounce()
      
        if(elapsedTime > 2500){
            balls[i].reduceSpeed()
          
        } else {
            balls[i].increaseSpeed()

        }

     
     
    }

    
   

 }
   
 
      
   
}


class Particle{
    constructor(randomSize, x, y){
        this.x = x
        this.y = y
        this.mouse = mouseX
        this.speed = 0.5
        this.size = randomSize
        this.flickering = true //the balls are still jiggling 
        this.alpha = 1
        this.h = random(360)
        this.s = random(90,100)
        this.b = random(90,100)
        this.color = color(this.h,  this.s,   this.b, this.alpha);
        this.singleParticle = false
        this.blur = 0
        this.blurVariation = false
        this.transparentShape = false
        this.xoff = 0
        this.yoff = 0

    }

    flicker(){
       // mySound.play();
        
    }

    showOneParticle(){
    
        singleBall = [balls[11]]
      
        balls = singleBall
        
        this.singleParticle = false
       //console.log(this.singleParticle, balls)



    }

 
    reduceOpacity(colorParticle){
 
      this.alpha = this.alpha - 0.025
      
      if(this.alpha <= 0 ){
       
        this.singleParticle = true 
        this.alpha = 1

     

        
      }
      
        return this.alpha
    }

 
    reduceSpeed(){
        if(this.speed >= 1 ){
            
            this.speed = this.speed - 0.2
            return this.speed

        } else {
            this.flickering = false
          
            
        } 
       
    }

    increaseSpeed(){

     if(this.speed < 20){
        return this.speed++
     }
      
    }

    fillShape(){
     
            fill(this.h, this.s, this.b, this.alpha) 

            if(this.flickering){
                this.newColor()
            }
    }

    move(){

        if(this.speed >= 1){
            this.mouse = map(mouseX, 0, width, 0, 5);
            this.x += random(-this.speed, this.speed)
            this.y += random(-this.speed, this.speed)

        } else {
          
            this.xoff += 0.1
            this.yoff += 0.1
            this.x +=  random(-noise(this.xoff) * 2, noise(this.xoff)  * 2)
            this.y += random(-noise(this.yoff) * 2, noise(this.yoff) * 2)
        }

    }

    drawSpikyShape(){
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
         
        //setCenter(this.x/width, this.y/4);
       // polarEllipses(1, this.size, this.size, 10);
       if(!this.blurVariation){
        this.drawSpikyShape()
        this.fillShape()
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
       
    }

     
    }

    toBlur(){
        if(!this.blurVariation){
            drawingContext.filter = 'blur('+String(this.blur)+ 'px)';
            this.blur += 0.3
            console.log('entering', this.blur)
            if(this.blur > 25){
                
                this.blurVariation = true
                return 
            }

        } else {
            this.decreaseBlur()
        }
   
    }

    decreaseBlur(){
        this.blur -= 0.3
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
        this.x += (targetX - this.x) * this.speed / 100;
        this.y += (targetY - this.y) * this.speed / 100;

    }
    drawPolarShape(){
        frameRate(120)
           
          
        
        if(!this.transparentShape){
            fill(color(100,100,100,0))
            this.transparentShape = true

        } else {
            this.fillPolarShape()
        }       
        setCenter(this.x, this.y);
        frameRate(30)
        polarEllipses(10, 10+sin(frameCount/15)*20, 20, 20);
      
      
    }

    fillPolarShape(){
       // https://happycoding.io/tutorials/p5js/for-loops/vertical-gradient
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
     
        this.h = random(360)
        this.s = random(90,100)
        this.b = random(90,100)

        
        
    }

    bounce(){
        if(this.x > width || this.x <  0 || this.y > height || this.y <   0  ){
            this.x--
          
        }
    }

    toGradient() {
        let gradient = drawingContext.createLinearGradient(0,0,100,100);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');
        
        drawingContext.fillStyle = gradient;
        drawingContext.fillRect(0,0,this.x,
            this.y);
      }
}

 