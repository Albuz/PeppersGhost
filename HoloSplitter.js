//questa libreria dati in input il renderer della scena la divide in 4 grazie alle 4 camera quì sotto impostate
var cameraFrontale = new THREE.PerspectiveCamera(); //front
var cameraPosteriore = new THREE.PerspectiveCamera(); //back
var cameraSinistra = new THREE.PerspectiveCamera(); //left
var cameraDestra = new THREE.PerspectiveCamera(); //right

var camersHandler = [cameraFrontale, cameraPosteriore, cameraSinistra, cameraDestra];

var positionCenterInit = new THREE.Vector3();
var rotationCenterInit = new THREE.Quaternion();
var cameraDistanceFromObj = 50;
var cameras = [cameraFrontale, cameraPosteriore, cameraSinistra, cameraDestra];
var cameraRotation = [0, 180 * (Math.PI / 180), 90 * (Math.PI / 180), 90 * (Math.PI / 180)];

var viewPortLSize = window.innerHeight / 3; //considerando che devo gestire 4 camere, devo considerare lo spazio di 3 viewport lungo l'asse y dello schermo. La dimensione massima che posso concedere ad un lato è 1/3 dell'altezza del mio schermo.
var posXverticalCamera = (window.innerWidth / 2) - ((viewPortLSize) / 2); //cordinata x della camera frontale e posteriore. ovviamente hanno la stessa x ma diversa y
var posYhorizontalCamera = (viewPortLSize) * 2;

THREE.HoloSplitter = function(renderer) {

    this.render = function(scene, camera) {

        scene.updateMatrixWorld();
        camera.updateMatrixWorld();

        for (var x = 0; x < 2; x++) {
            cameras[x].position.copy(positionCenterInit);
            cameras[x].quaternion.copy(rotationCenterInit);
            cameras[x].translateZ(cameraDistanceFromObj);
            cameras[x].lookAt(positionCenterInit);
            cameras[x].rotation.z += cameraRotation[x];
        }

        for (var y = 2; y < 4; y++) {
            cameras[y].position.copy(positionCenterInit);
            cameras[y].quaternion.copy(rotationCenterInit);
            cameras[y].translateX((y < 3) ? -cameraDistanceFromObj : cameraDistanceFromObj);
            cameras[y].lookAt(positionCenterInit);
            cameras[y].rotation.x += cameraRotation[y];
        }

        renderer.setScissorTest(true);

				//SetScissor( x, y, x2, y2 ) costruisco
				cuttingRender(renderer,0,(window.innerWidth / 2) - ((viewPortLSize) / 2), ((viewPortLSize) * 2), (viewPortLSize), (viewPortLSize));
				cuttingRender(renderer,1,(window.innerWidth / 2) - ((viewPortLSize) / 2), 0, (viewPortLSize), (viewPortLSize));
        cuttingRender(renderer,2,(window.innerWidth / 2) - ((viewPortLSize) / 2) - (viewPortLSize), (viewPortLSize), (viewPortLSize), (viewPortLSize));
        cuttingRender(renderer,3,(window.innerWidth / 2) + ((viewPortLSize) / 2), (viewPortLSize), (viewPortLSize), (viewPortLSize));

    };

			function cuttingRender(renderer,currentCamera,x, y, x2, y2){
				renderer.setScissor(x, y, x2, y2);
				renderer.setViewport(x, y, x2, y2);
				renderer.render(scene, cameras[currentCamera]);
			}

};
