var bg;
var gameState="Start";
var ship,simage;
var parrot,pimage;
var doctor,dimage;
var sea,seaimage;
var obstacle,o1,o2,o3,o4,obstacleGroup;
var message,mimage;
var life=5;
var score=0;
var land;
var coconut,coconutGroup;

function preload(){
bg=loadImage("bgimage.jpg")
simage=loadImage("ship.png")
pimage=loadImage("combined.png")
seaImage=loadImage("sea.jpg")
mimage=loadImage("message.jpg")
o1=loadImage("shark.png")
o2=loadImage("eship.png")
o3=loadImage("island1.png")
o4=loadImage("island2.png")
land=loadImage("jungle.jpg")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  Form1=new Form()
  sea=createSprite(displayWidth/2,displayHeight/2-200,displayWidth,displayHeight)
  sea.visible=false;
  sea.addImage(seaImage)
  sea.scale=2;
  doctor=createSprite(displayWidth/2,displayHeight/2+200,30,100)
  doctor.visible=false;
  ship=createSprite(doctor.x,doctor.y,50,30)
  ship.visible=false;
  ship.addImage(simage)
  parrot=createSprite(displayWidth/2,displayHeight/2,100,100)
  parrot.visible=false;
  parrot.addImage(pimage)
  parrot.scale=0.5;
  obstacleGroup=new Group()
  coconutGroup=new Group()
}

function draw() {
  background(bg);  

  if(gameState==="Start"){
    Form1.display()
  }


  if(gameState==="Intro"){
    clear()
    ship.visible=true;
    parrot.visible=true;
    sea.visible=true;
    //message.visible=true;
    drawSprites();
    fill("black")
    textSize(20)
    textStyle("Bold")
    textFont("Times New Roman")
    text("Hello! I am Polly.", displayWidth/2-100,displayHeight/2-70)
    text("Dr.Dunold is a animal doctor and is ", displayWidth/2-250,displayHeight/2-40)  
    text("helping the Queen of Gwenland. Help ", displayWidth/2-250,displayHeight/2-10)    
    text("him escape the obstacles and get the ", displayWidth/2-250,displayHeight/2+20)  
    text("cure of the Queen's illness...", displayWidth/2-150,displayHeight/2+50)
    textSize(26)
    text("PRESS ENTER TO START PLAYING", displayWidth/2-200,100)
  

     if(keyDown("Enter")){
       gameState="Play"
     }
  }
 
    if (gameState==="Play"){
      clear()
    sea.visible=true;
    parrot.visible=false;
    ship.visible=true;
    if(keyDown("LEFT_ARROW")){
      ship.x-=5;
    }
    if(keyDown("RIGHT_ARROW")){
      ship.x+=5;
    }
    drawSprites()
     sea.velocityY=7

     score=score+Math.round(getFrameRate()/60)

     if(sea.y>800){
       sea.y=displayHeight/2-200
     }
     fill("Black")
     textSize(26)
     textFont("Times New Roman")
     textStyle("Bold")
     text("SCORE: "+score,50,80)
     text("LIFE LEFT: "+life,50,50)
     spawnObstacles()
     for(var i=0; i<obstacleGroup.length; i++){
     if(obstacleGroup.get(i).isTouching(ship)){
      obstacleGroup.get(i).destroy()
      life=life-1
  }

  }
     if(life!==0 && score>=5000){
       clear()
       gameState="Land"
     }

     if(life===0){
       gameState="End"
     }
  }
if(gameState==="Land"){
  background(land)
  sea.visible=false;
  parrot.visible=true;
  ship.visible=false;
  obstacleGroup.destroyEach()
  drawSprites()
  fill("black")
  textSize(20)
  textStyle("Bold")
  textFont("Times New Roman")
  text("Hey! Congrats.", displayWidth/2-100,displayHeight/2-70)
  text("You have crossed Level 1. Just a bit ", displayWidth/2-250,displayHeight/2-40)  
  text("more time and you will win the game ", displayWidth/2-250,displayHeight/2-10)    
  text("Remember! Obstacles can come from anywhere! ", displayWidth/2-250,displayHeight/2+20)  
  text("So be Ready ;-)", displayWidth/2-150,displayHeight/2+50)
  textSize(26)
  text("PRESS ENTER TO START PLAYING", displayWidth/2-200,50)
  if(keyDown("Enter")){
    gameState="Level2"
  }
  
}

if(gameState==="Level2"){
  background(land)
  sea.visible=false;
  parrot.visible=false;
  ship.visible=false;
  obstacleGroup.destroyEach()
  spawncoconuts()
  doctor.visible=true;
  drawSprites()
  if(keyDown("LEFT_ARROW")){
    doctor.x-=5;
  }
  if(keyDown("RIGHT_ARROW")){
    doctor.x+=5;
  }

}
  if(gameState==="End"){
    sea.visible=false;
    parrot.visible=false;
    ship.visible=false;
    background(0)
    fill("White")
     textSize(40)
     textFont("Times New Roman")
     textStyle("Bold")
    text("GAME OVER :-(",displayWidth/2-150,displayHeight/2)
    textSize(25)
    text("Press Reset to Restart the game",displayWidth/2-180,displayHeight/2+50)
  }

}

function spawnObstacles(){
  if(frameCount%100===0){
    obstacle=createSprite(random(50,displayWidth-50),-100,200,100)
    obstacle.velocityY=4+(frameCount/200)
    obstacle.lifetime=1000
    obstacle.debug=true;
    var ran=Math.round(random(1,3))
    switch(ran){
      case 1: obstacle.addImage(o1)
              obstacle.x=random(displayWidth-150,150)
              obstacle.setCollider("rectangle",0,0,50,200)
      break;
      case 2: obstacle.addImage(o2)
              obstacle.x=random(displayWidth-150,150)
              obstacle.setCollider("rectangle",0,0,50,100)
      break;
      case 3: obstacle.addImage(o3)
              obstacle.scale=1.5;
              obstacle.x=(random(20,displayWidth-30))
              obstacle.setCollider("circle",0,0,100)
      break;
      default:break;
    }
    obstacleGroup.add(obstacle)

  }
}

function spawncoconuts(){
  var r=Math.round(random(80,200))
  if(frameCount%r===0){
    coconut=createSprite(random(50,displayWidth-50),0,200,100)
    coconut.velocityY=4+(frameCount/200)
    coconut.lifetime=1000
    coconutGroup.add(coconut)

  }
}