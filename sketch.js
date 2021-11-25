var trex, trex_running, edges,pisito;
var groundImage;
var piso;
var pisoFalso;
var stickermuerto;

//sonido
var jumpsonido;
var diesonido;
var checkPoint;

var j=0;

var resetboton;
var calcomaniareset;

var cloud;

var gameovercalc; 

var gameover;

var obstaculos;

var calcomaniacloud;

var contador;

var OBS1;
var OBS2;
var OBS3;
var OBS4;
var OBS5;
var OBS6;

var j=0;

var Obstaclegroup;
var Cloudgroup;

var PLAY = 1;
var END = 0;

var GAMESTATE = PLAY;

function preload(){

  jumpsonido = loadSound("jump.mp3");
  diesonido = loadSound ("die.mp3");
  checkPoint = loadSound ("checkPoint.mp3");

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  pisito= loadImage("ground2.png");
 calcomaniacloud = loadImage ("cloud.png");

 gameovercalc= loadImage ("gameOver (1).png");

 stickermuerto = loadAnimation ("trex_collided.png");

 calcomaniareset = loadImage ("restart (1).png");

 OBS1= loadImage ("obstacle1.png");
OBS2= loadImage ("obstacle2.png");
OBS3= loadImage ("obstacle3.png");
OBS4= loadImage ("obstacle4.png");
OBS5= loadImage ("obstacle5.png");
OBS6= loadImage ("obstacle6.png");


}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
 
  contador=0;
  gameover = createSprite (width/2,height/2,10,10);
  gameover.addImage("seacabo",gameovercalc);

  resetboton= createSprite (width/2,height/2+50,20,30);
  resetboton.addImage("resetear",calcomaniareset);

  pisoFalso= createSprite(width/2,height/2,width,10);
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  piso =createSprite(width/2,height/2-5,600,20);

  trex.addAnimation("pollo", stickermuerto);

 piso.addImage("pisin", pisito);
 piso.position.x=piso.width/2;
  edges = createEdgeSprites();
 
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  pisoFalso.visible=false;

  resetboton.visible=false;

  gameover.visible= false;

  Obstaclegroup = new Group();
  Cloudgroup = new Group ();

  trex.setCollider("Circle",0,0,40);
}


function draw(){
  //establecer color de fondo.
  background("white");
  

  if (GAMESTATE === PLAY){

  
    contador++;

    text("puntaje: "+contador,width-100,20);

    if (contador%20 === 0 && contador!=0 && j === 0){
      checkPoint.play();
      j++;
    }

    if((keyDown("space")||touches.length>0) && trex.position.y>height/2-50){
      trex.velocityY = -9;
      jumpsonido.play();
      touches=[];
    }
    if(piso.position.x<350){
      piso.position.x=piso.width/2;
    }
    piso.velocityX =-4;
    trex.velocityY = trex.velocityY + 0.5;
    clouds();
    obstacles();
    if(trex.isTouching(Obstaclegroup)){
      diesonido.play();

      GAMESTATE = END;
    }
    
  }

  else if (GAMESTATE === END){

    piso.velocityX=0;
    Obstaclegroup.setVelocityXEach(0);
    Cloudgroup.setVelocityXEach(0);
    trex.velocityY = 0;
    trex.changeAnimation("pollo", stickermuerto);

    resetboton.visible=true;
    gameover.visible=true;
    
    if (mousePressedOver(resetboton)||touches.length>0){
      reiniciar();
      touches=[];
    }
    
    /*if ((resetboton)){
      GAMESTATE = PLAY;
    }*/
  }

  


  Obstaclegroup.depth=resetboton.depth;
  resetboton.depth++;


  
  
  //evitar que el Trex caiga
  trex.collide(pisoFalso);

 /* contador=Math.round(frameCount/10);

  text("puntaje: "+contador,550,20);*/

  drawSprites();

}

function clouds (){
  
  if (frameCount%80 === 0){
    cloud= createSprite (width+width*0.5,random(height/2-60,height/2-100),20,10);
  cloud.velocityX=-3;

  cloud.addImage("bongo", calcomaniacloud);
  cloud.lifetime=cloud.x/cloud.velocityX;
  Cloudgroup.add(cloud);
  }
  

  console.log(frameCount);

  
  } 

function obstacles(){

  if(frameCount%200 === 0){
  obstaculos= createSprite (width+width*0.1,height/2-10,20,40);
  obstaculos.scale=0.5;

  obstaculos.velocityX=-3-frameCount/200;
  obstaculos.lifetime= obstaculos.x/obstaculos.velocityX;

  switch( Math.round(random(1,6))){
    case 1: obstaculos.addImage("OBS1",OBS1);
    break;
    case 2: obstaculos.addImage("OBS2",OBS2);
    break;
    case 3: obstaculos.addImage("OBS3",OBS3);
    break;
    case 4: obstaculos.addImage("OBS4",OBS4);
    break;
    case 5: obstaculos.addImage("OBS5",OBS5);
    break;
    case 6: obstaculos.addImage("OBS6",OBS6);
    break;
    default: break;
  }

  console.log(frameCount);

  Obstaclegroup.add(obstaculos);

  setup.debug= true;

}


}

function reiniciar (){
  GAMESTATE = PLAY;
  Obstaclegroup.destroyEach();
  Cloudgroup.destroyEach();

  gameover.visible=false;
  resetboton.visible=false;

  trex.changeAnimation("running", trex_running);

  contador=0;

}