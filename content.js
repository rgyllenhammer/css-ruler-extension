chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){

    if (message.type == "sizing"){
        if (!isNaN(message.data)){
            step = message.data;
            setWidth(chunks);
        } else {
            console.log("Size changes must be integers")
        }
    } else if (message.type == "disable"){
        disableRuler();
    } else if (message.type == "enable"){
        enableRuler();
    }

}

function disableRuler(){
    document.body.removeChild(ruler);
}

function enableRuler(){

    document.onmousemove = divFollow;
    document.onkeydown = rotateDiv;

    document.body.appendChild(ruler);
    setWidth(chunks);
}

var step = 5;
var tickWidth = 1;
var tickDist = step + tickWidth;
var chunks = 15;


var rotation = 0;
var rotationStep = 5;

var ruler = document.createElement("div");
ruler.id = "ruler";

var lastMouseX = 0;
var lastMouseY = 0;


function divFollow(event){
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    moveDiv(lastMouseX, lastMouseY);
}


function moveDiv(xPos, yPos){
    ruler.style.left = xPos - (ruler.clientWidth / 2) + 'px';
    ruler.style.top = yPos - (ruler.clientHeight / 2) + 'px';
}


function growDiv() {
    chunks += 4;
    setWidth(chunks);
}


function shrinkDiv() {
    chunks -= 4;
    setWidth(chunks);
}


function setWidth(size){
    ruler.style.paddingLeft = step.toString() + 'px';
    ruler.innerHTML = '';
    for (var i = 0; i < chunks; i++){
        var tickmark = document.createElement('div');
        tickmark.style.marginRight = step.toString() + 'px';
        if (i % 2 == 1){
            // ruler.innerHTML += '<div style="marigin-right: 10px;" class="vertical-long"></div>';
            tickmark.className = 'vertical-long';

        } else {
            // ruler.innerHTML += '<div style="marigin-right: 10px;" class="vertical"></div>';
            tickmark.className = 'vertical';
        }
        ruler.appendChild(tickmark);
    }

    ruler.style.width = size * tickDist + 1;
}


function rotateDiv(event) {

    if (event.keyCode == 82) { // R
        ruler.style.transform = 'rotate('+ (rotation + rotationStep).toString() + 'deg)';
        rotation += rotationStep;
    } else if (event.keyCode == 69) { // E
        ruler.style.transform = 'rotate('+ (rotation - rotationStep).toString() + 'deg)';
        rotation -= rotationStep;
    } else if (event.keyCode == 71) { // G
        growDiv();
        moveDiv(lastMouseX, lastMouseY);
    } else if (event.keyCode == 70) { // F
        shrinkDiv();
        moveDiv(lastMouseX, lastMouseY);
    }
}
