import * as THREE from 'three';

THREE.Cache.enabled = true;

let container;

let camera, cameraTarget, scene, renderer;

let group, material;

let pageWidth = window.innerWidth, pageHeight = window.innerHeight;

let targetRotation = 0, 
    targetRotationOnPointerDown = 0, 
    pointerX = 0, 
    pointerXOnPointerDown = 0;
    let windowHalfX = window.innerWidth / 2;

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // CAMERA

    camera = new THREE.PerspectiveCamera( 30, pageWidth / pageHeight, 1, 1000 );
    camera.position.set( 0, 400, 700 );

    cameraTarget = new THREE.Vector3( 0, 150, 0 );

    // SCENE

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x333333 );
    scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

    // LIGHTS

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
    pointLight.color.setHSL( Math.random(), 1, 0.5 );
    pointLight.position.set( 0, 200, 90 );
    scene.add( pointLight );

    group = new THREE.Group();
    group.position.y = 100;


    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( pageWidth / 4, pageHeight / 4 ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.5, transparent: true } )
    );
    plane.position.y = 100;
    plane.rotation.x = - Math.PI / 2;
    group.add( plane );

    const geometry = new THREE.BoxGeometry(70,70,70);
    material = new THREE.MeshBasicMaterial( { color: 0x874CCC } );
    const cube = new THREE.Mesh( geometry, material );

    cube.position.y = plane.position.y + (geometry.parameters.height / 2) ;
    cube.position.x = 0;
    group.add( cube );
    
    scene.add( group );

    // RENDERER

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( pageWidth, pageHeight );
    container.appendChild( renderer.domElement );

    // EVENTS

    container.style.touchAction = 'none';
    container.addEventListener( 'pointerdown', onPointerDown );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;

    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;

    camera.aspect = pageWidth / pageHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( pageWidth, pageHeight );
}

function onPointerDown( event ) {

    if ( event.isPrimary === false ) return;

    pointerXOnPointerDown = event.clientX - windowHalfX;
    targetRotationOnPointerDown = targetRotation;

    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener( 'pointerup', onPointerUp );

}

function onPointerMove( event ) {

    if ( event.isPrimary === false ) return;

    pointerX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;

}

function onPointerUp( event ) {

    if ( event.isPrimary === false ) return;

    document.removeEventListener( 'pointermove', onPointerMove );
    document.removeEventListener( 'pointerup', onPointerUp );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;

    camera.lookAt( cameraTarget );

    renderer.clear();
    renderer.render( scene, camera );

}

init();
animate();