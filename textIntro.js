var viewPortLSize = window.innerHeight / 3;
var xPos = [(window.innerWidth / 2) - ((viewPortLSize) / 2),(window.innerWidth / 2) - ((viewPortLSize) / 2),(window.innerWidth / 2) - ((viewPortLSize) / 2) - (viewPortLSize),(window.innerWidth / 2) + ((viewPortLSize) / 2)];
var yPos = [0,viewPortLSize * 2,viewPortLSize,viewPortLSize];
var cameraRotation = [0, 180, 90, 90];

//var element = document.getElementsByClassName('introScene')[0].setAttribute("style","width:"+viewPortLSize+"px; height:"+viewPortLSize+"px; left:"+xPos[i]+"px;top:"+yPos[i]+"px;");

for(var i = 0; i < 4; i++){
  console.log(xPos[i],yPos[i]);
  document.getElementsByClassName('introScene')[i].setAttribute("style","width:"+viewPortLSize+"px; height:"+viewPortLSize+"px; left:"+xPos[i]+"px;top:"+yPos[i]+"px;");
  unfade(document.getElementsByClassName('introScene')[i])
}
document.getElementsByClassName('logoScene')[0].setAttribute("style","transform:rotateZ("+cameraRotation[0]+"deg);");
document.getElementsByClassName('logoScene')[1].setAttribute("style","transform:rotateZ("+cameraRotation[1]+"deg);");
document.getElementsByClassName('logoScene')[2].setAttribute("style","transform:rotateX("+cameraRotation[2]+"deg);transform:scalex(-1)");
document.getElementsByClassName('logoScene')[3].setAttribute("style","transform:rotateX("+cameraRotation[3]+"deg);transform:scalex(1)");


function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 200);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}
