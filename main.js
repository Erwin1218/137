img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("dog_cat.jpg")
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cococssd', modelLoaded);
    document.getElementById("status").innerHTML.HTML = "Estado: destacado objetos";
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
      for (var i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Estado: objeto detectado";
  
        fill(255, 0, 0);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(255, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }

}
function modelLoaded()
{   
     console.log("¡Modelo cargado")
     status= true;
     objectDetector.detect(img, goResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = results;
}