var camera, scene, renderer, effect;
var group;
var mPlay = false;

init();
animate();

function init() {

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);

    var mainLight = new THREE.PointLight(0xff0000,200,9000);
    mainLight.position.set(10,10,5);
    scene.add(mainLight);

    var ambiente = new THREE.AmbientLight(0x0000ff,1);
    scene.add(ambiente);

    var geometry = new THREE.TorusKnotGeometry( 10, 1, 1000, 5 );
    var material = new THREE.MeshLambertMaterial( { color: 0x0395ad} );
    var TorusKnot = new THREE.Mesh(geometry, material);
    var position = TorusKnot.position;

    for (var i = 0; i < 4; i++) {
        var TorusKnot = new THREE.Mesh(geometry, material);
        group.add(TorusKnot);
    }

    document.body.appendChild(renderer.domElement);

      effect = new THREE.HoloSplitter(renderer);
      effect.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.01;
    effect.render(scene, camera);
}

document.addEventListener('click', function() {
var audio = new Audio('Everything_in_its_right_place.mp3');
  if(!mPlay)
  audio.play();
mPlay=true;
}, false);
