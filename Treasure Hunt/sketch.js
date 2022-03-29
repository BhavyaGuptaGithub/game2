var ship, shipMoving;
var bg, bgImg;
var playb, playImg;

var ok, okImg;

var SERVE = 0;
var WAIT = 1;
var PLAY = 2;
var END = 3;
var gameState = SERVE;

var startSound;
var playSound;
var press;

var sea,seaImg;

var water, waterImg;

var stone, stoneImg, stone2Img, stone3Img;
var stoneg;

var coin, coinImg, coinG;

var Score = 0;
var Lives = 3;

function preload(){
    bgImg = loadImage("bgg.png");
    playImg = loadImage("play.png");
    okImg = loadImage("okb.png");
    waterImg = loadImage("water.png");
    seaImg = loadImage("sea21.jpg");
    shipMoving = loadAnimation("ship1.png","ship2.png");
    startSound = loadSound ("serve.mp3");
    playSound = loadSound("song2.mp3");
    press = loadSound("press.mp3");
    stoneImg = loadImage("stone1.png");
    stone2Img = loadImage("Stone 2.png");
    stone3Img = loadImage("Stone3.png");
    coinImg = loadImage("coin1.png")
}

function setup(){
    createCanvas(1100,800);

    bg = createSprite(550,400);
    bg.addImage("bg",bgImg);
    bg.visible=true;
    bg.scale=1.42;

    playb = createSprite(560,600);
    playb.addImage("playing",playImg);
    playb.visible=true;

    water = createSprite(550,400);
    water.addImage("water",waterImg);
    water.visible=false;
    water.scale= 2.8;

    ok = createSprite(560,600);
    ok.addImage("ok",okImg);
    ok.visible=false;
    ok.scale = 0.5;

    sea = createSprite(550,400);
    sea.addImage("sea",seaImg);
    sea.visible=false;
    sea.scale=6;
    sea.velocityX = -6;

    ship = createSprite(200,500,100,400);
    ship.addAnimation("Ship", shipMoving);
    ship.scale=0.3;
    ship.visible = false;

    stoneg=new Group();
    coinG=new Group();
}

function draw(){

    background("black");

    drawSprites();

    if (gameState === SERVE){
        //startSound.play();
        if(mousePressedOver(playb)) {
            gameState = WAIT;
            press.play();
        }
    }
    if (gameState === WAIT){
        playb.visible = false;
        bg.visible = false;
        
        textSize(80);
        fill("black");
        text("RULES:-",420,100);
        text("OBJECTIVES:-",300,370);
        textSize(50);
        fill("black");
        text("1)Use UP ARROW and DOWN ARROW to make the ship move UP and DOWN respectively",10,180);
        text("the ship move UP and DOWN respectively",50,240);
        text("1) Collect 25 coins as possible",20,440);
        text("2) Do not touch the stones",20,500);
        ok.visible = true;
        water.visible = true;
        if (mousePressedOver(ok)){
            gameState = PLAY;
            water.visible = false;
            ok.visible = false;
        }
            
    }
    if (gameState === PLAY){
        //playSound.play(); 
        sea.visible = true;
        ship.visible = true;
        if (sea.x < 0) {
            sea.x = sea.width / 2;
        }
        spawnStone();
        spawnCoin();

        if(ship.isTouching(coinG)){
            Score = Score+1;
            coinG.destroyEach();
        }
        if(ship.isTouching(stoneg)){
            Lives = Lives - 1;
            stoneg.destroyEach();
        }
        textSize(40);
        fill("black");
        text("Score ="+Score, 100,100);
        text("Lives ="+Lives,100,140);

        if (keyDown(UP_ARROW)){
            ship.y -= 5;
        }
        if (keyDown(DOWN_ARROW)){
            ship.y += 5;
        }
    }

    
}

function spawnStone() {
    if (frameCount % 200 === 0) {
      var stone = createSprite(1200,500,40,10);
      stone.y = Math.round(random(300,700));
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: stone.addImage(stoneImg);
                break;
        case 2: stone.addImage(stone2Img);
                break;
        case 3: stone.addImage(stone3Img);
                break;
      }
      stone.scale = 0.6;
      stone.velocityX = -6
      stone.lifetime = 1200;
      stoneg.add(stone);
    }
}

function spawnCoin(){
    if (frameCount % 300 === 0) {
        var coin = createSprite(1200,500,40,10);
        coin.y = Math.round(random(300,700));
        coin.addImage("coins", coinImg)
        coin.scale = 0.2;
        coin.velocityX = -6
        coin.lifetime = 1200;
        coinG.add(coin);
      }
}