var gameState = "PLAY"
var tower, towerIMG
var ghost, ghostIMG
var climberGroup, doorGroup, climberIMG
function preload(){
climberIMG = loadImage("climber.png")
towerIMG = loadImage("tower.png")
ghostIMG = loadImage("ghost-standing.png")
doorIMG = loadImage("door.png")
}
function setup(){
  createCanvas(600 ,600)
 tower = createSprite(300, 300, 600, 600)
  tower.addImage(towerIMG)
  tower.velocityY = 4
  ghost = createSprite(300, 300)
  ghost.addImage(ghostIMG)
  ghost.scale = 0.5
  ghost.setCollider("rectangle",0, 0, 200, 200)
  ghost.debug=true
  climberGroup = new Group()
  doorGroup = new Group()
}
function draw(){
  background("black")
  if(gameState==="PLAY"){
drawSprites()
  console.log(tower.y)
  if(tower.y>600){
    tower.y = 300
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x += 4
  }
  if(keyDown("left_arrow")){
    ghost.x += -4
  }
  if(keyDown("space")){
    ghost.velocityY = -4
  }
  ghost.velocityY = ghost.velocityY + 0.8
  spawnWindow()
  if(climberGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy()
    gameState = "END"
  }
  }
  
  if(gameState==="END"){
    textSize(20)
    fill("cyan")
    text("Game Over",300,300)
  }
}
function spawnWindow(){
  if(frameCount%100===0){
    var door =createSprite(Math.round(random(100,400)),5)
    door.addImage(doorIMG)
    door.velocityY = 4
    var climber = createSprite(door.x, door.y + 50)
    climber.addImage(climberIMG)
    climber.velocityY = 4
    climberGroup.add(climber)
    doorGroup.add(door)
    climber.lifetime =300
    door.lifetime =300
  }
}