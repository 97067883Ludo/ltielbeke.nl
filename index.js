import * as THREE from 'three';
import {GLTFLoader} from "three/addons";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if(isDarkMode()) {
    scene.background = new THREE.Color(0x101218);
} else {
    scene.background = new THREE.Color(0xffffff);
}

const light = new THREE.AmbientLight( 0x404040, 25 ); // soft white light
scene.add( light );

camera.position.z = 4.2;
camera.position.y = 5;
camera.position.x = 5;
camera.rotation.y = 0.70;
camera.rotation.x = -1;
camera.rotation.z = 0.85;

function animate() {
    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );

loadGltfFile("/models/rooms/rooms.glb");

function loadGltfFile(GlftUrl) {
    loader.load(
        // resource URL
        GlftUrl,
        // called when the resource is loaded
        function ( gltf ) {

            scene.add( gltf.scene );

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );
}

