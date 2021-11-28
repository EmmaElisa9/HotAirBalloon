var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");

  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1340,600);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.4;

  var BPosition = database.ref("balloon/height");
  BPosition.on("value",readHeight,showError);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
    updateHeight(+10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale+0.01;
    //escribe el código para mover el globo aerostático en dirección ascendente
    updateHeight(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale-0.01;
    //escribe el código para mover el globo aerostático en dirección descendente
    updateHeight(0,+10);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}


function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}


function showError(){
  console.log("Error in writing to the database");
}