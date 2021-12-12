var desert, desertimg;
var rahul, rahulimg;
var ground;
var cactus, cactusimg, cactusgrp;
var keys, keyimg, keygrp;
var score=0;
var lives=5;
var gameState="start";
var goimg, themeimg, oasisimg;

function preload(){
  desertimg=loadImage("desert.webp");
  rahulimg=loadAnimation("rahul.gif");
  cactusimg=loadImage("cactus.png");
  keyimg=loadImage("key.png");
  goimg=loadImage("gameOver.jpg");
  themeimg=loadImage("themepage.jpg");
  oasisimg=loadImage("oasis.jpg");
}

function setup(){
  createCanvas(displayWidth,displayHeight-100);
desert=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
desert.addImage(desertimg);
desert.scale=4;
desert.velocityX=-3;

ground=createSprite(displayWidth/2,displayHeight-300,displayWidth+100,20);
ground.visible=false;

rahul=createSprite(200,displayHeight-320);
rahul.addAnimation("running",rahulimg);
rahul.scale=0.6;
rahul.setCollider("circle",0,0,40);

cactusgrp= new Group();
keygrp= new Group();
}

function draw(){
  if(gameState==="start"){
    background(themeimg);
    textSize(40);
    fill("black");
    text("Press Enter to start the game",displayWidth/2-275,displayHeight/2-380);
    text("Press W to jump and collect keys or to dodge the Monster Cacti",displayWidth/2-550,displayHeight/2-300);
  }

  if(keyDown("enter") && gameState==="start"){
    gameState="play";
    background(0);
  }

  if(gameState==="play"){

    if(desert.x<400){
  desert.x=displayWidth/2;
}

if(keyDown("w")){
  rahul.velocityY=-15;
}

rahul.velocityY+=0.5;

rahul.collide(ground);
 

if(keygrp.isTouching(rahul)){
  score=score+2;
  keygrp.destroyEach();
  if(score===100){
    gameState="win";
  }
}

if(cactusgrp.isTouching(rahul)){
  lives=lives-1;
  cactusgrp.destroyEach();
if(lives<=0){
  gameState="end";
}
}

spawncactus();
spawnkeys();

  drawSprites();

  fill("black");
  textSize(35);
  text("Score: "+score,50,50);
  text("Lives: "+lives,50,100);
  } 
  
  if(gameState==="win"){
    background(oasisimg);
    textSize(40);
    fill("black");
    text("Congratulations, You found Water",displayWidth/2-300,displayHeight/2-380);
}

if(gameState==="end"){
  background(goimg);
  }
}

function spawncactus(){
  if(frameCount%500===0){
    cactus=createSprite(displayWidth+50,displayHeight-300);
    cactus.addImage(cactusimg);
    cactus.scale=0.3;
    cactus.depth=rahul.depth;
    rahul.depth+=1;
    cactus.velocityX=-6;
    cactus.lifetime=700;
    cactusgrp.add(cactus);
  }
}

function spawnkeys(){
  if(frameCount%200===0){
    keys=createSprite(displayWidth+50,displayHeight-700);
    keys.addImage(keyimg);
    keys.scale=0.08;
    keys.depth=rahul.depth;
    rahul.depth+=1;
    keys.velocityX=-6;
    keys.lifetime=700;
    keygrp.add(keys);
  }
}