var PLAY = 1;
var END = 0;
var gameState = PLAY;

var reaper, reaperimg;

var ground,path, pathimg,floor,groundimg,invisibleGround;
var background, backgroundimg;

var obstacle, obstacleimg, obstacleGroup;

var score = 0;

var gameover, restart, gameOverImg, restartImg;



function preload(){

groundimg = loadImage("ground.png");
reaperimg = loadImage("pixel reaper.png");
obstacleimg = loadImage("obstacle.png");
backgroundimg = loadImage("background.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
}

function setup() {
createCanvas(600,200);

obstacleGroup = new Group();

background = createSprite(300,150);
background.addImage(backgroundimg);

reaper = createSprite(50,160,400,20);
reaper.addAnimation("Overwatchreaper", reaperimg);
reaper.scale = 0.4;

// ground = createSprite(200,180,400,20);
// ground.visible = false
// ground.x = ground.width/2;
// ground.scale = 0.1;
// ground.velocityX = -6

ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundimg);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);


// invisibleGround = createSprite(200,190,400,10);
invisibleGround = createSprite(width/2,height-10,width,125);  
invisibleGround.visible = false;

gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameover.scale = 0.5;
  restart.scale = 0.1;

  gameover.visible = false;
  restart.visible = false;

 score = 0;
}

function draw() {
//  background(255);
 text("Score: "+ score,500,50);
                 
 if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

     if(keyDown("space")) {     
        reaper.velocityY = -12;  
    }
    
    reaper.velocityY = reaper.velocityY + 0.8;

    // if(ground.x < 300){
    //     ground.x = ground.width/2 
    // }

    if (ground.x < 0){
        ground.x = ground.width/2;
      }

    reaper.collide(invisibleGround);
    spawnObstacle();

    if(obstacleGroup.isTouching(reaper)){
        gameState = END; 
    }
    drawSprites(); 

 }
 else if (gameState === END){ //unexpected else ?
    gameover.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    reaper.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
   
    if(mousePressedOver(restart)){
       reset();
    }
    drawSprites(); 
   
   }

 
}
 


function spawnObstacle() {
    if(frameCount % 60 ===0) {
        // var obstacle = createSprite(600,155,10,30);
        var obstacle = createSprite(600,height-95,20,30);
        obstacle.addImage("coffinObstacle", obstacleimg);
        obstacle.velocityX = -(6 + 3*score/100);
        obstacle.scale = 0.2;
        obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);

    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstacles.destroy();


    score = 0;
}