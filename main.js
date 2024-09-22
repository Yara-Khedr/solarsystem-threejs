import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Correct import path for OrbitControls

import suntext from "./materials/2k_sun.jpg";
import earthtext from "./materials/2k_earth_daymap.jpg";
import mercurytext from "./materials/2k_mercury.jpg";
import venustext from "./materials/2k_venus_surface.jpg";
import marstext from "./materials/2k_mars.jpg";
import jupitertext from "./materials/2k_jupiter.jpg";
import saturntext from "./materials/2k_saturn.jpg";
import uranustext from './materials/2k_uranus.jpg';
import neptunetext from './materials/2k_neptune.jpg';
import asteriod from './materials/asteriod.jpg';
import comet from './materials/comet.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate); 
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x111219);

// to move the screen around  as well as zoom in and out with the mouse
const orbitcontrols = new OrbitControls(camera, renderer.domElement);

//allows u to add images as textures rather than color
const textureloader= new THREE.TextureLoader();

// Create the sun
const sungeometry = new THREE.SphereGeometry(30);
const sunmaterial = new THREE.MeshBasicMaterial({ map: textureloader.load(suntext) });
const sun = new THREE.Mesh(sungeometry, sunmaterial);
scene.add(sun);

const pointlight= new THREE.PointLight(0xFFFFFF,4500, 200);
scene.add(pointlight);

// Set the initial camera position
camera.position.set(20, 20, 150);
orbitcontrols.update();

// Function to create a new planet and add it to the scene
function createPlanet(radius, position, texture) {
  const planetGeometry = new THREE.SphereGeometry(radius);
  const planetMaterial = new THREE.MeshStandardMaterial({ map: textureloader.load(texture) });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.position.set(position.x || 0, position.y || 0, position.z || 0);
  return planet;
}

//adding a parent object or each planet in order to rotate around the sun
function planetorbit(planet) {
  const rotationpoint = new THREE.Object3D();
  rotationpoint.add(planet);
  scene.add(rotationpoint);
  return rotationpoint;
}

//function to create stars, asteriods, or comets and add them to the scene
function createOther(type, number) {
  for (let i = 0; i < number; i++) {
      let geometry;
      let material;
      let object;

      switch (type) {
          case 'star':
              geometry = new THREE.SphereGeometry(0.1, 8, 8); 
              material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
              object = new THREE.Mesh(geometry, material);

            // add the objects in randomized positions
              object.position.set(
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 400
               );
              break;
              
          case 'comet':
              geometry = new THREE.SphereGeometry(0.6, 16, 16);
              material = new THREE.MeshBasicMaterial({ map: textureloader.load(comet) });
              object = new THREE.Mesh(geometry, material);
              object.position.set(
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 250
                );
              break;
              
          case 'asteroid':
              geometry = new THREE.IcosahedronGeometry(0.9, 0);
              material = new THREE.MeshBasicMaterial({ map: textureloader.load(asteriod) });
              object = new THREE.Mesh(geometry, material);
              object.position.set(
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 250
                );
              break;
      }
      scene.add(object);
  }
}

// Create planets
const mercury = createPlanet(1.4, { x: 0, y: 0, z: 35 }, mercurytext);
const mercuryorbit=planetorbit(mercury);

const venus = createPlanet(3.4,{ x: 0, y: 0, z: 43 }, venustext);
const venusorbit=planetorbit(venus);

const earth = createPlanet(4, { x: 0, y: 0, z: 53 }, earthtext);
const earthorbit=planetorbit(earth);

const mars = createPlanet(3.1,{ x: 0, y: 0, z: 63 }, marstext);
const marsorbit=planetorbit(mars);

const jupiter = createPlanet(8, { x: 0, y: 0, z: 80 }, jupitertext);
const jupiterorbit=planetorbit(jupiter);

const saturn = createPlanet(6.5, { x: 0, y: 0, z: 97 }, saturntext);
const saturnorbit=planetorbit(saturn);

const uranus = createPlanet(4.0, { x: 0, y: 0, z: 110 }, uranustext);
const uranusorbit=planetorbit(uranus);

const neptune = createPlanet(3.6,{ x: 0, y: 0, z: 120 }, neptunetext);
const neptuneorbit=planetorbit(neptune);

//creating other celestial objects
createOther('star', 1000);
createOther('comet',10);
createOther('asteriod', 10);

// Animate the scene and render
function animate() {

  //planet rotates around itself
  sun.rotation.y += 0.001;
  mercury.rotation.y += 0.02;
  venus.rotation.y += 0.005;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.05;
  saturn.rotation.y += 0.04;
  uranus.rotation.y += 0.03;
  neptune.rotation.y += 0.03;


  //planet rotates around the sun
  mercuryorbit.rotation.y += 0.004 * (1 / 0.24);
  venusorbit.rotation.y += 0.004 * (1 / 0.62);
  earthorbit.rotation.y += 0.004 * (1 / 1);
  marsorbit.rotation.y += 0.004 * (1 / 1.88);
  jupiterorbit.rotation.y += 0.006 * (1 / 11.86);
  saturnorbit.rotation.y += 0.02 * (1 / 29.46);
  uranusorbit.rotation.y += 0.02 * (1 / 84);
  neptuneorbit.rotation.y += 0.03 * (1 / 164.8);

  orbitcontrols.update(); 
  renderer.render(scene, camera);
}


//making website SORTA responsive?? stays centered regardardless of window size
window.addEventListener('resize', function(){
  camera.aspect= window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})
