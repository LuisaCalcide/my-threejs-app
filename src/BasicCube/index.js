import * as THREE from 'three';

//creazione di una scena con una perspective camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / window.innerHeight, 0.1, 1000 );

//Impostazione del rendering dell'app
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Aggiungiamo alla scena un cubo(boxGeometry) e creiamo un materiale(material: basic color violet) apposito
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x874CCC } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

//Render della scena per ogni fotogramma(60 x sec)
function animate() {
	requestAnimationFrame( animate );

  //animazione del cubo - rotazione
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();