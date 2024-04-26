import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


let camera, scene, renderer;

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x669FAB );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 15;

    const gridHelper = new THREE.GridHelper(100,100);
    scene.add(gridHelper);

    //Luci
    scene.add( new THREE.HemisphereLight( 0xcccccc, 0x999999, 3 ) );

    const light = new THREE.DirectionalLight( 0xffffff, 3 );
    light.position.set( 0, 6, 0 );
    scene.add( light );

    //Aggiungiamo alla scena un cubo(boxGeometry) e creiamo un materiale(material: basic color violet) apposito
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x874CCC } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.y = 0.5;
    cube.position.x = 3;
    scene.add( cube );

    const floorGeometry = new THREE.PlaneGeometry( 15, 15 );
    const floorMaterial = new THREE.MeshBasicMaterial( { color: 0x023020 } )
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add( floor );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.xr.enabled = true;
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0.5, - 0.2 );
    controls.update();

    document.body.appendChild( VRButton.createButton( renderer ) );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//Render della scena per ogni fotogramma(60 x sec)
function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    renderer.render( scene, camera );
}

init();
animate();
