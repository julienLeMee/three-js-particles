import './style.css'
import {
  AxesHelper,
  BoxBufferGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer } from 'three' // Importing the Scene and WebGLRenderer classes from the three.js library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Importing the OrbitControls class from the three.js library

const scene = new Scene() // Création d'une nouvelle scène

const count = 100 // nombre de points
const distance = 2 // distance entre les points, les points sont placés entre -distance et distance

scene.add(new AxesHelper()) // Ajout d'un repère à la scène

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000) // Création d'une nouvelle caméra
// le 75 est l'angle de vue de la caméra
// window.innerWidth / window.innerHeight est le ratio de la fenêtre
// le 0.01 est la distance minimale de la caméra
// le 1000 est la distance maximale de la caméra

camera.position.z = 2 // Déplacement de la caméra sur l'axe z
camera.position.y = 0.5 // Déplacement de la caméra sur l'axe y
camera.position.x = 0.5 // Déplacement de la caméra sur l'axe x
// permet de voir la scène en 3D
// camera.position.set(0.5, 0.5, 2) // Déplacement de la caméra sur les axes x, y et z
scene.add(camera) // Ajout de la caméra à la scène


const points = new Float32Array(count * 3) // Création d'un tableau de 300 valeurs
// count * 3 car chaque point est représenté par 3 valeurs (x, y, z)
for (let i = 0; i < count; i++) { // boucle qui parcourt le tableau
  points[i] = MathUtils.randFloatSpread(distance * 2) // place un point entre -distance et distance
  points[i + 1] = MathUtils.randFloatSpread(distance * 2) // place un point entre -distance et distance
  points[i + 2] = MathUtils.randFloatSpread(distance * 2) // place un point entre -distance et distance
}

const geometry = new BufferGeometry() // Création d'une géométrie de cube
geometry.setAttribute('position', new Float32BufferAttribute(points, 3)) // Ajout d'un attribut position à la géométrie
const pointMaterial = new PointsMaterial({
  color: 'red',
  size: 0.1,
}) // Création d'un matériau de points

const pointsObject = new Points(geometry, pointMaterial) // Création d'un point avec la géométrie du cube et la couleur du matériau

scene.add(pointsObject) // Ajout des points à la scène

const renderer = new WebGLRenderer({
  antialias: true // permet d'activer l'anti-crénelage
}) // Création d'un nouveau renderer
renderer.setSize(window.innerWidth, window.innerHeight) // Définition de la taille du renderer
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Définition du ratio de pixel du renderer
// cela permet de ne pas surcharger les performances de l'appareil
document.body.appendChild(renderer.domElement) // ajoute le renderer à la page

const controls = new OrbitControls(camera, renderer.domElement) // permet de déplacer la caméra avec la souris

function tick() {
  renderer.render(scene, camera) // affiche la scène avec la caméra
  // camera.lookAt(0, 0, 0) // fait regarder la caméra vers le centre de la scène
  controls.update() // permet de déplacer la caméra avec la souris
  requestAnimationFrame(tick) // demande à la fonction tick de s'exécuter à nouveau
}

tick() // exécute la fonction tick

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight // définit le ratio de la caméra
  camera.updateProjectionMatrix() // met à jour la matrice de projection de la caméra
  renderer.setSize(window.innerWidth, window.innerHeight) // définit la taille du renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // définit le ratio de pixel du renderer
})
