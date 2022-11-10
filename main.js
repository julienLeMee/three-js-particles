import './style.css'
import { AxesHelper, BoxBufferGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three' // Importing the Scene and WebGLRenderer classes from the three.js library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Importing the OrbitControls class from the three.js library

const scene = new Scene() // Création d'une nouvelle scène

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

const cube = new Mesh(
  new BoxBufferGeometry(1, 1, 1), // Création d'un cube
  new MeshNormalMaterial() // Création d'un material qui permet de colorer les faces du cube par rapport à leur position face à la caméra
)
scene.add(cube) // Ajout du cube à la scène

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
