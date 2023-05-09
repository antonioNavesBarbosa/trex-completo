var trex, trexRun;
var solo, soloImg;
var soloInvisivel
var cloud, cloudImg
var cacto, cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var escore = 0
var play = 1
var end = 0
var gameState = play
var cactosGp, cloudGp
var record = 0
var trexCollide
var gameOver, gameOverImg
var restart, restartImg
var jumpSound, pointSound, dieSound
//preload carrega as midías do jogo 
function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png")
  cactoImg1 = loadImage("obstacle1.png")
  cactoImg2 = loadImage("obstacle2.png")
  cactoImg3 = loadImage("obstacle3.png")
  cactoImg4 = loadImage("obstacle4.png")
  cactoImg5 = loadImage("obstacle5.png")
  cactoImg6 = loadImage("obstacle6.png")
  trexCollide = loadAnimation("trex_collided.png")
  gameOverImg = loadImage("gameOver.Png")
  restartImg = loadImage("restart.Png")
  jumpSound = loadSound("jump.mp3")
  pointSound = loadSound("checkPoint.mp3")
  dieSound = loadSound("die.mp3")
}
//setup faz a aconfiguração
function setup() {
  createCanvas(windowWidth,windowHeight);
  // criando as bordas

  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("run", trexRun);
  trex.addAnimation("collided", trexCollide)
  trex.scale = 0.5

  trex.debug = false
  //trex.setCollider("rectangle",0,0,80,200,40)
  trex.setCollider("circle", 0, 0, 27)
  solo = createSprite(width/2, height-10,width, 2)
  solo.addImage('solo', soloImg)

  soloInvisivel = createSprite(width/2, height-5, width, 2)
  soloInvisivel.visible = false

  gameOver = createSprite(width/2, height-100)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5

  restart = createSprite(width/2, height-60)
  restart.addImage(restartImg)
  restart.scale = 0.5

  gameOver.visible = false
  restart.visible = false

  cactosGp = new Group()
  cloudGp = new Group()

}
//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f7");


  text("Score: " + escore, width-50, height-150)
  text("Record:" + record, width-50, height-130)

  if (gameState === play) {
    escore += Math.round(getFrameRate()/60)
    if (escore > 0 && escore % 100 == 0) {
      pointSound.play()
    }

    solo.velocityX = -(9 + escore / 100)

    if (touches.length>0||keyDown("space") && trex.y > height-30) {
      trex.velocityY = -8 
      jumpSound.play()
      touches=[]
    }

    if (solo.x < 800) {
      solo.x = solo.width / 2
    }
    gerarNuvens()
    createCactos()



  }

  if (trex.isTouching(cactosGp)) {
    gameState = end
    //dieSound.play()
  }

  if (gameState === end) {
    trex.changeAnimation("collided", trexCollide)
    cactosGp.setLifetimeEach(-1)
    cloudGp.setLifetimeEach(-1)
    cactosGp.setVelocityXEach(0)
    cloudGp.setVelocityXEach(0)
    solo.velocityX = 0

    gameOver.visible = true
    restart.visible = true

    if (record<escore){
      record=escore
    }

    if (mousePressedOver(restart)){
      gameState=play
      trex.changeAnimation("run", trexRun);
      gameOver.visible=false
      restart.visible=false
      cactosGp.destroyEach()
      cloudGp.destroyEach()
      escore=0

    }
  }




  trex.velocityY += 0.5
  trex.collide(soloInvisivel);



  //coordenadas do mouse na tela
  text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
  drawSprites();

}


function gerarNuvens() {
  if (frameCount % 80 == 0) {
    cloud = createSprite(width, random(height-190, height-100), 40, 10);
    cloud.velocityX = -(4 + escore / 100)
    cloud.addImage(cloudImg)
    cloud.scale = random(0.4, 1.5)
    cloud.depth = trex.depth - 1
    cloud.lifetime = width/cloud.velocityX
    cloudGp.add(cloud)
  }


}

function createCactos() {

  if (frameCount % 80 == 0) {
    cacto = createSprite(width, height-20   , 40, 10);
    cacto.velocityX = -(5 + escore / 100)
    cacto.scale = 0.4
    cacto.lifetime = 220
    cacto.depth = trex.depth
    cacto.lifetime = width/cacto.velocityX

    cactosGp.add(cacto)

    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1)
        break;
      case 2: cacto.addImage(cactoImg2)
        break;
      case 3: cacto.addImage(cactoImg3)
        break;
      case 4: cacto.addImage(cactoImg4)
        break;
      case 5: cacto.addImage(cactoImg5)
        break;
      case 6: cacto.addImage(cactoImg6)
        break;


    }

  }

}



























































































